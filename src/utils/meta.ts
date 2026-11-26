/**
 * Longest meta description to emit.
 *
 * 155 rather than 160: the guides collection in src/content/config.ts already
 * refuses a description over 155, and the two limits disagreeing meant 317
 * pages shipped a tag the schema would have rejected.
 */
const DESCRIPTION_LIMIT = 155;

/** Shortest cut worth keeping. Below this the snippet says too little to earn the click. */
const MIN_CUT = 95;

/**
 * Clamp a meta description to the display budget.
 *
 * The authored copy is left untouched in the data files, since it is used
 * elsewhere on the page; only what reaches the tag is clamped.
 *
 * The cut is chosen in order of how finished the result reads:
 *
 *   1. a sentence end, so the snippet closes a thought;
 *   2. a clause boundary, with the comma or semicolon dropped so the result
 *      reads as a complete phrase rather than an abandoned sentence;
 *   3. a word boundary, which is genuinely mid-sentence and is the only case
 *      that earns an ellipsis.
 *
 * Only step 3 used to exist, so 114 pages showed a snippet ending in "..."
 * when a clause boundary a few words earlier would have read as written copy.
 *
 * Lives here rather than in a layout because Base, BaseAr and BaseTr all emit
 * the tag and the Arabic and Turkish pages were the ones still over budget.
 */
export function clampDescription(value: string | undefined): string | undefined {
  if (typeof value !== 'string' || value.length <= DESCRIPTION_LIMIT) return value;

  const head = value.slice(0, DESCRIPTION_LIMIT);

  /* The Arabic pages punctuate with U+060C (،) and U+061F (؟) and the Turkish
     ones with the Latin set, so both are listed. Without the Arabic comma the
     eight /ar/ market pages could only ever reach the ellipsis branch. */
  const lastOf = (marks: string[]) => Math.max(...marks.map(m => head.lastIndexOf(m)));

  // 1. Sentence end. The trailing space is required so "Odoo 19. " matches but "19.0" does not.
  const sentence = lastOf(['. ', '! ', '? ', '؟ ']);
  if (sentence >= MIN_CUT) return head.slice(0, sentence + 1);

  // 2. Clause boundary. Trailing punctuation is stripped: a description ending
  // in a bare comma reads as a mistake, the same phrase without it does not.
  const clause = lastOf([', ', '; ', ': ', '، ']);
  if (clause >= MIN_CUT) return head.slice(0, clause).replace(/[\s,;:.،–—-]+$/, '');

  // 3. Mid-sentence. Reserve the three characters the ellipsis needs.
  const trimmed = value.slice(0, DESCRIPTION_LIMIT - 3);
  const lastSpace = trimmed.lastIndexOf(' ');
  const cut = lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed;
  return `${cut.replace(/[\s,;:.–—-]+$/, '')}...`;
}
