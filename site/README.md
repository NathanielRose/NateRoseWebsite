# naterose.io — researcher-style rebuild

Astro static site. Built alongside the existing Jekyll site (which is untouched
in the repo root) so the two can be compared before any cutover.

```bash
npm install      # once
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## Layout

| Path | What it is |
|---|---|
| `src/pages/index.astro` | Homepage: identity block, bio, selected projects, recent writing |
| `src/pages/[slug].astro` | Blog posts, at the **original Jekyll URLs** |
| `src/pages/writing/` | Blog posts + Substack, merged into one list |
| `src/pages/projects/` | The media showcase |
| `src/pages/publications/` | Deliberately empty — see below |
| `src/data/*.ts` | Content for projects / publications / Substack |
| `src/content/posts/` | The six migrated markdown posts |

## Permalinks

Jekyll used `permalink: /:title/`. `[slug].astro` strips the `YYYY-MM-DD-`
filename prefix to reproduce those exact URLs, so existing links and search
results keep working. Don't rename the files in `src/content/posts/`.

## Media: use MP4, not GIF

`src/data/projects.ts` entries take an optional `video`. Author clips as H.264
MP4 — the same loop is roughly 10-20x smaller than an animated GIF, and GIF's
256-colour ceiling destroys screen recordings.

```bash
ffmpeg -i capture.mov -vf "fps=24,scale=600:-2" -c:v libx264 \
       -pix_fmt yuv420p -crf 30 -movflags +faststart public/media/name.mp4
ffmpeg -i public/media/name.mp4 -vframes 1 -q:v 4 public/media/name.jpg  # poster
```

Playback rules, in `src/components/MediaThumb.astro`:

- Nothing autoplays on load; `preload="none"` means no bytes until first play.
- Mouse: hovering a row plays that row's clip only.
- Touch: exactly one clip plays — whichever tile is most visible.
- `prefers-reduced-motion: reduce` disables video entirely; posters only.

The clips currently in `public/media/` are **ffmpeg-generated placeholders**
(mandelbrot, game-of-life, gradients, cellular automata). Replace them.

## Substack

Set `SUBSTACK_URL` in `src/data/substack.ts`. Posts are pulled from the
publication's `/feed` **at build time** and merged into `/writing/`, newest
first, tagged with a `Substack` badge.

Build-time, not client-side, because Substack's feed sends no CORS headers.
The consequence: new newsletter posts only appear when the site rebuilds, so
add a daily GitHub Actions cron or a Cloudflare deploy hook.

Until the URL is set, everything degrades gracefully — `/writing/` shows just
the blog posts and a note.

## Publications

`src/data/publications.ts` is an empty array on purpose. Papers and talks want
different metadata (authors + venue vs. event + slides/video), so the row
format should be chosen once the actual content is known.

## Known content issues

- **Post images are mostly dead.** 90 images across the six posts pointed at
  two Azure storage accounts (`natewebsite` and `rtwrt`). Both now fail DNS
  resolution. Five were recovered from `assets/img/github_readme/` and are
  served from `public/images/posts/`; the other 85 are gone. Worth checking
  the Wayback Machine.
- **Three post titles were reconciled.** Each post repeated its title as a
  body `<h1>` because the old Jekyll layout didn't render `page.title`. Those
  headings were removed. In three posts the heading differed from the front
  matter — see the migration notes.
