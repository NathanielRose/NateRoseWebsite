// Intentionally empty. I did not invent entries here — tell me what belongs in
// this bucket (talks? workshops? Berkeley neurotech/data-science work?) and the
// row shape below can be adjusted to match.
//
// A paper row wants:  authors · venue · year  + [pdf] [code] links
// A talk row wants:   event · location · date + [slides] [video] links
// They are different enough that picking one matters.

export interface Publication {
  title: string;
  href: string;
  /** e.g. "A. Author, N. Rose. NeurIPS 2025" */
  meta?: string;
  desc?: string;
  poster?: string;
  video?: string;
  badge?: string;
  external?: boolean;
}

export const publications: Publication[] = [];
