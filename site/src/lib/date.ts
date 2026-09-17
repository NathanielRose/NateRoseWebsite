/**
 * Jekyll front matter dates (`date: 2018-01-02`) parse as UTC midnight.
 * Formatting those in a negative-offset local timezone silently rolls them
 * back a day, so every date on the site is rendered in UTC explicitly.
 */
export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
