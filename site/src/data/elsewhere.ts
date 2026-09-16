// Talks and podcast appearances. Written pieces published elsewhere live in
// archive.ts instead, because those get a local copy; audio and video cannot
// be mirrored the same way, so these are links only.

export interface Elsewhere {
  title: string;
  href: string;
  /** Venue, publication, show. */
  meta?: string;
  /** Exact date where known. */
  date?: string;
  /** Year only, when no day is recorded. */
  year?: string;
  badge: 'Talk' | 'Podcast' | 'Article';
}

export const elsewhere: Elsewhere[] = [
  {
    title: 'Orchestrating DBT Transformations with GitLab CI/CD',
    href: 'https://www.youtube.com/watch?v=4WId_l8F4Z8',
    meta: 'Big Data Days 2022 · Enterprise Big Data Framework',
    date: '2022-05-24',
    badge: 'Talk',
  },
  {
    title: 'DAOs: Building Global Entities for Virtual Communities',
    href: 'https://www.youtube.com/watch?v=KwrR4hSn1i4',
    meta: 'Apex: XRPL Dev Summit 2022',
    year: '2022',
    badge: 'Talk',
  },
  {
    title: 'Diversity and Inclusion in the Blockchain and Crypto Industry',
    href: 'https://podcasts.apple.com/us/podcast/diversity-and-inclusion-in-the-blockchain-crypto/id1525978924?i=1000551961016',
    meta: 'All About Blockchain',
    date: '2022-02-23',
    badge: 'Podcast',
  },
  {
    title: 'ML Training and Deployment Pipeline Using Databricks',
    href: 'https://web.archive.org/web/20230331155429/https://engineering.ripple.com/ml-training-and-deployment-pipeline-using-databricks/',
    // A colleague's article, so it is linked rather than copied into /archive/.
    meta: 'Ripple Engineering · Mihir Mavalankar · via Wayback Machine',
    date: '2023-03-30',
    badge: 'Article',
  },
];
