// Local copies of articles published elsewhere, so they survive the original
// going offline. Each body lives in src/archive/<slug>.html — extracted with
// Readability, images pulled down, links absolutised.
//
// Provenance is shown on every archived page, and `author` is the real byline
// rather than an assumption: several of these are *about* Nathaniel rather
// than by him, which the pages say plainly.

export interface ArchivedPost {
  slug: string;
  title: string;
  /** Where it was originally published. */
  publication: string;
  /** The byline as printed on the original. */
  author: string;
  originalUrl: string;
  /** false when the original no longer resolves. */
  originalLive: boolean;
  /** Wayback capture this copy came from, for originals that are gone. */
  archiveUrl?: string;
  date: string;
  excerpt?: string;
  /** Figures the capture did not preserve. */
  missingFigures?: number;
}

export const archived: ArchivedPost[] = [
  {
    slug: 'circle-airflow-data-and-billions-across-blockchains',
    title: 'Circle: Airflow, Data and Billions Across Blockchains',
    publication: 'Astronomer',
    author: 'Matthew Keep',
    originalUrl: 'https://www.astronomer.io/blog/airflow-in-action-circle/',
    originalLive: true,
    date: '2025-01-03',
    excerpt:
      "Coverage of Nathaniel Rose's Airflow Summit talk on how Circle runs Airflow across blockchain data at scale.",
  },
  {
    slug: 'black-at-ripple-ergs-dao-applications',
    title: 'Black at Ripple Aims to Unite ERGs Through DAO Applications',
    publication: 'Ripple Insights',
    author: 'Team Ripple',
    originalUrl:
      'https://ripple.com/insights/black-at-ripple-aims-to-unite-ergs-through-dao-applications/',
    originalLive: true,
    date: '2022-03-01',
    excerpt:
      'On applying DAO structures to employee resource groups, built around Nate Rose’s work leading the effort at Ripple.',
  },
  {
    slug: 'diversity-in-crypto-and-web3-brazil',
    title: 'Diversity in Crypto and Web3: A Discussion with Brazil’s Tech Community',
    publication: 'Ripple Insights',
    author: 'Team Ripple',
    originalUrl:
      'https://ripple.com/insights/diversity-in-crypto-and-web3-a-discussion-with-brazils-tech-community/',
    originalLive: true,
    date: '2022-11-11',
    excerpt:
      'A panel with Brazil’s tech community, convened through Black at Ripple during Nathaniel Rose’s tenure as its president. The piece is credited to Team Ripple and does not name individual organisers.',
  },
  {
    slug: 'building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp',
    title: 'Building CI/CD with Airflow, GitLab and Terraform in GCP',
    publication: 'Ripple Engineering',
    author: 'Nathaniel Rose',
    originalUrl:
      'https://engineering.ripple.com/building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp/',
    originalLive: false,
    archiveUrl:
      'https://web.archive.org/web/20230324155125/https://engineering.ripple.com/building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp/',
    date: '2021-02-02',
    excerpt:
      'A CI/CD pipeline for Airflow DAGs on Cloud Composer: GitLab runners, pre-commit linting, DAG build validation and smoke tests, Terraform-managed deployment and Slack alerting.',
    missingFigures: 6,
  },
];
