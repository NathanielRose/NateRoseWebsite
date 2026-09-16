// Metadata taken from the arXiv record rather than the CV — note the titles
// differ slightly ("the State of the Art in Defense Methods" on arXiv vs.
// "Existing Defense Methods" on the CV). The arXiv version wins here.
//
// Preprints are deliberately not listed; this is published work only.

export interface Publication {
  title: string;
  href?: string;
  /** Author line plus venue, rendered inline after the title. */
  meta?: string;
  /** Shown verbatim. Year only — no month is displayed in a citation line. */
  year: string;
  badge: 'Publication';
}

export const publications: Publication[] = [
  {
    title: 'Threat Vectors and the State of the Art in Defense Methods for Security in Neurotechnology',
    href: 'https://arxiv.org/abs/2607.10451',
    meta: 'B. Bagley, N. Rose, Q. Kilbourn, M. Canham. arXiv:2607.10451 [cs.CR]',
    year: '2026',
    badge: 'Publication',
  },
];
