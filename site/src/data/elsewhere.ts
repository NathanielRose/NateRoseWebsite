// Talks, podcasts and articles published somewhere other than this site.
//
// Two of these were on engineering.ripple.com, which has been decommissioned.
// Where Nathaniel wrote the piece, a local copy lives under /archive/ (see
// archive.ts) so it does not depend on archive.org staying reachable. The
// Databricks post is a colleague's work, so it is linked, not mirrored.

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
  /** True when the link leaves this site. */
  external?: boolean;
}

export const elsewhere: Elsewhere[] = [
  {
    title: 'Orchestrating DBT Transformations with GitLab CI/CD',
    href: 'https://www.youtube.com/watch?v=4WId_l8F4Z8',
    meta: 'Big Data Days 2022 · Enterprise Big Data Framework',
    date: '2022-05-24',
    badge: 'Talk',
    external: true,
  },
  {
    title: 'DAOs: Building Global Entities for Virtual Communities',
    href: 'https://www.youtube.com/watch?v=KwrR4hSn1i4',
    meta: 'Apex: XRPL Dev Summit 2022',
    year: '2022',
    badge: 'Talk',
    external: true,
  },
  {
    title: 'Diversity in Crypto and Web3: A Discussion with Brazil’s Tech Community',
    href: 'https://ripple.com/insights/diversity-in-crypto-and-web3-a-discussion-with-brazils-tech-community/',
    meta: 'Ripple Insights',
    date: '2022-11-11',
    badge: 'Article',
    external: true,
  },
  {
    title: 'Black at Ripple Aims to Unite ERGs Through DAO Applications',
    href: 'https://ripple.com/insights/black-at-ripple-aims-to-unite-ergs-through-dao-applications/',
    meta: 'Ripple Insights',
    date: '2022-03-01',
    badge: 'Article',
    external: true,
  },
  {
    title: 'Diversity and Inclusion in the Blockchain and Crypto Industry',
    href: 'https://podcasts.apple.com/us/podcast/diversity-and-inclusion-in-the-blockchain-crypto/id1525978924?i=1000551961016',
    meta: 'All About Blockchain',
    date: '2022-02-23',
    badge: 'Podcast',
    external: true,
  },
  {
    title: 'Circle: Airflow, Data and Billions Across Blockchains',
    href: 'https://www.astronomer.io/blog/airflow-in-action-circle/',
    meta: 'Astronomer',
    date: '2025-01-03',
    badge: 'Article',
    external: true,
  },
  {
    title: 'ML Training and Deployment Pipeline Using Databricks',
    href: 'https://web.archive.org/web/20230331155429/https://engineering.ripple.com/ml-training-and-deployment-pipeline-using-databricks/',
    // Written by a colleague, so it is linked rather than copied here.
    meta: 'Ripple Engineering · by Mihir Mavalankar · via Wayback Machine',
    date: '2023-03-30',
    badge: 'Article',
    external: true,
  },
];
