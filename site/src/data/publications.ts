// From the 2026 CV. One published paper; the other two are preprints and are
// badged as such rather than counted as publications.
//
// `href` is left empty where no public link is known yet — an entry without a
// link renders as plain text instead of a dead anchor. Fill in DOI/arXiv URLs
// as they land.

export interface Publication {
  title: string;
  href?: string;
  /** Authors, venue — whatever a citation line should carry. */
  meta?: string;
  desc?: string;
  /** Shown verbatim. Year only, since no month is recorded on the CV. */
  year: string;
  badge: 'Publication' | 'Preprint';
  poster?: string;
  video?: string;
}

export const publications: Publication[] = [
  {
    title: 'Threat Vectors and Existing Defense Methods for Security in Neurotechnology',
    meta: 'Bagley et al.',
    desc:
      'Survey of the attack surface across brain-computer interfaces and neural data pipelines, and what defenses currently exist against it.',
    year: '2026',
    badge: 'Publication',
  },
  {
    title: 'EEG Dataset Sampling Rate Investigation for Participant Identification',
    desc:
      'How far sampling rate can be reduced before EEG stops supporting reliable identification of the participant it came from.',
    year: '2026',
    badge: 'Preprint',
  },
  {
    title: 'Measuring Data Reuse in Open Neuroscience: A Systematic Analysis of the DANDI Archive',
    desc:
      'A systematic look at whether openly published neuroscience datasets actually get reused, measured across the DANDI archive.',
    year: '2026',
    badge: 'Preprint',
  },
];
