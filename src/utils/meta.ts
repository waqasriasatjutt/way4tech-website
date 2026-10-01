/** Longest meta description a SERP will show before it cuts mid-word. */
const DESCRIPTION_LIMIT = 160;

/**
 * Clamp a meta description to the display budget.
 *
 * 99 pages shipped a description past the limit. The authored copy is left
 * untouched in the data files, since it is used elsewhere on the page; only
 * what reaches the tag is clamped. The cut lands on a sentence end where one
 * is available so the snippet still finishes a thought, and room is reserved
 * for the ellipsis, or a 159 character cut plus "..." lands at 162.
 *
 * Lives here rather than in a layout because Base, BaseAr and BaseTr all emit
 * the tag and the Arabic and Turkish pages were the ones still over budget.
 */
export function clampDescription(value: string | undefined): string | undefined {
  if (typeof value !== 'string' || value.length <= DESCRIPTION_LIMIT) return value;

  const head = value.slice(0, DESCRIPTION_LIMIT);
  const lastStop = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (lastStop >= 110) return head.slice(0, lastStop + 1);

  const trimmed = value.slice(0, DESCRIPTION_LIMIT - 3);
  const lastSpace = trimmed.lastIndexOf(' ');
  const cut = lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut.replace(/[\s,;:.\-]+$/, '')}...`;
}
