// The single merged feed of everything written, spoken or published, newest
// first. Both the homepage and /writing/ read from here so the two can't drift
// out of sync — the homepage previously listed only blog posts and so showed
// 2018 as the most recent thing.
import { getCollection } from 'astro:content';
import { publications } from '../data/publications';
import { elsewhere } from '../data/elsewhere';
import { archived } from '../data/archive';
import { fetchSubstackPosts } from '../data/substack';
import { formatDate } from './date';

export type FeedRow = {
  title: string;
  href?: string;
  /** Formatted for display. */
  when: string;
  /** Epoch ms, for ordering only. */
  sort: number;
  meta?: string;
  badge: string;
  external?: boolean;
};

const slugOf = (id: string) => id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
/** Year-only items sort to the end of their year rather than claiming a day. */
const endOfYear = (year: string) => new Date(Number(year), 11, 31).valueOf();

export async function getFeed(): Promise<FeedRow[]> {
  const papers: FeedRow[] = publications.map((p) => ({
    title: p.title,
    href: p.href,
    when: p.year,
    sort: endOfYear(p.year),
    meta: p.meta,
    badge: p.badge,
    external: Boolean(p.href),
  }));

  const talks: FeedRow[] = elsewhere.map((e) => ({
    title: e.title,
    href: e.href,
    when: e.date ? formatDate(new Date(e.date)) : (e.year ?? ''),
    sort: e.date ? new Date(e.date).valueOf() : e.year ? endOfYear(e.year) : 0,
    meta: e.meta,
    badge: e.badge,
    external: true,
  }));

  // While an original is live it stays the primary link and the row reads as a
  // normal article — the local mirror exists as insurance, not as something a
  // reader needs to know about. Only when the original is gone does the row
  // point at the copy, and only then is it labelled "Archived".
  const mirrors: FeedRow[] = archived.map((a) => ({
    title: a.title,
    href: a.originalLive ? a.originalUrl : `/archive/${a.slug}/`,
    when: formatDate(new Date(a.date)),
    sort: new Date(a.date).valueOf(),
    meta: `${a.publication} · ${a.author}`,
    badge: a.originalLive ? 'Article' : 'Archived',
    external: a.originalLive,
  }));

  const blog: FeedRow[] = (await getCollection('posts')).map((post) => ({
    title: post.data.title,
    href: `/${slugOf(post.id)}/`,
    when: formatDate(post.data.date),
    sort: post.data.date.valueOf(),
    badge: 'Blog',
  }));

  const newsletter: FeedRow[] = (await fetchSubstackPosts()).map((item) => ({
    title: item.title,
    href: item.href,
    when: formatDate(item.date),
    sort: item.date.valueOf(),
    badge: 'Substack',
    external: true,
  }));

  return [...papers, ...talks, ...mirrors, ...blog, ...newsletter].sort(
    (a, b) => b.sort - a.sort
  );
}
