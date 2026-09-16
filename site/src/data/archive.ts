// Posts Nathaniel wrote for publications that no longer exist, kept here as
// local copies so they survive independently of archive.org.
//
// Each entry's body lives in src/archive/<slug>.html — the article markup
// pulled from the Wayback capture, with the original site's furniture removed
// and links un-rewritten. Provenance is shown on every archived page.

export interface ArchivedPost {
  slug: string;
  title: string;
  /** Where it was originally published. */
  publication: string;
  /** Original URL, now dead — kept for the record. */
  originalUrl: string;
  /** The Wayback capture this copy was taken from. */
  archiveUrl: string;
  date: string;
  excerpt?: string;
  /** Set when the original carried figures that were not archived. */
  missingFigures?: number;
}

export const archived: ArchivedPost[] = [
  {
    slug: 'building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp',
    title: 'Building CI/CD with Airflow, GitLab and Terraform in GCP',
    publication: 'Ripple Engineering',
    originalUrl:
      'https://engineering.ripple.com/building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp/',
    archiveUrl:
      'https://web.archive.org/web/20230324155125/https://engineering.ripple.com/building-ci-cd-with-airflow-gitlab-and-terraform-in-gcp/',
    date: '2021-02-02',
    excerpt:
      'A CI/CD pipeline for Airflow DAGs on Cloud Composer: GitLab runners, pre-commit linting, DAG build validation and smoke tests, Terraform-managed deployment and Slack alerting.',
    missingFigures: 6,
  },
];
