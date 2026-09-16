// Set this to your publication, e.g. 'https://naterose.substack.com'.
// Left null until you send me the URL — every page degrades gracefully.
export const SUBSTACK_URL: string | null = null;

export interface FeedItem {
  title: string;
  href: string;
  date: Date;
  excerpt: string;
}

const strip = (s: string) =>
  s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
   .replace(/<[^>]+>/g, '')
   .replace(/&nbsp;/g, ' ')
   .replace(/&amp;/g, '&')
   .replace(/&lt;/g, '<')
   .replace(/&gt;/g, '>')
   .replace(/&#39;/g, "'")
   .replace(/&quot;/g, '"')
   .trim();

const tag = (block: string, name: string) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\s\S]*?)</${name}>`));
  return m ? strip(m[1]) : '';
};

/**
 * Fetched at BUILD time, not in the browser: Substack's feed sends no CORS
 * headers, so a client-side fetch is blocked. The consequence is that new
 * newsletter posts appear only when the site rebuilds — wire up a daily
 * GitHub Actions cron or a Cloudflare deploy hook.
 */
export async function fetchSubstackPosts(limit = 10): Promise<FeedItem[]> {
  if (!SUBSTACK_URL) return [];
  try {
    const res = await fetch(`${SUBSTACK_URL.replace(/\/$/, '')}/feed`);
    if (!res.ok) throw new Error(`feed responded ${res.status}`);
    const xml = await res.text();
    const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
    return items.slice(0, limit).map((block) => ({
      title: tag(block, 'title'),
      href: tag(block, 'link'),
      date: new Date(tag(block, 'pubDate')),
      excerpt: tag(block, 'description').slice(0, 220),
    }));
  } catch (err) {
    // A newsletter outage must not fail the build.
    console.warn('[substack] feed unavailable:', (err as Error).message);
    return [];
  }
}
