/*
 * The OWL course: structure, not content.
 *
 * Lessons live in src/content/course as MDX. This file holds the shape of the
 * course so the index, the breadcrumbs and the previous/next links all agree
 * without reading every lesson's frontmatter twice.
 *
 * Part numbers are stable. A lesson can be rewritten or renamed, but it keeps
 * its part and order, because the URL of every lesson is a page someone may
 * already have linked to or bookmarked.
 */

export const COURSE_SLUG = 'odoo-owl';
export const COURSE_BASE = `/learn/${COURSE_SLUG}`;

export interface CoursePart {
  number: number;
  title: string;
  /* One sentence, used on the index and in the part heading. */
  blurb: string;
}

export const COURSE_PARTS: CoursePart[] = [
  {
    number: 1,
    title: 'Getting your bearings',
    blurb:
      'What OWL is, why Odoo threw away the previous framework, and how to get code you have written onto a page you can see.',
  },
  {
    number: 2,
    title: 'Components',
    blurb:
      'The unit everything else is built from: templates, props, events and the judgement about where one component should end.',
  },
  {
    number: 3,
    title: 'Reactivity',
    blurb:
      'Why a screen redraws itself, the three ways people accidentally switch that off, and how to tell which one you have done.',
  },
  {
    number: 4,
    title: 'The lifecycle',
    blurb:
      'Every hook in the order it fires, what is safe to do inside each one, and the two that cause most of the bugs.',
  },
  {
    number: 5,
    title: 'Services and registries',
    blurb:
      'How a component reaches the server, opens a dialog or starts an action, and how Odoo finds code you added.',
  },
  {
    number: 6,
    title: 'Extending Odoo itself',
    blurb:
      'Changing components you do not own, and adding field widgets, systray items, client actions and view types.',
  },
  {
    number: 7,
    title: 'Making it hold up',
    blurb:
      'Tests, debugging a minified bundle in production, performance, and writing code that survives the next version.',
  },
  {
    number: 8,
    title: 'Three builds, end to end',
    blurb:
      'A dashboard, a field widget and a complete module, each built from an empty folder with nothing skipped.',
  },
];

export const PART_BY_NUMBER: Record<number, CoursePart> = Object.fromEntries(
  COURSE_PARTS.map(p => [p.number, p]),
) as Record<number, CoursePart>;

/*
 * What a reader should already have. Said plainly on the index, because the
 * fastest way to lose a beginner is to let them start something that assumes
 * five things nobody mentioned.
 */
export const COURSE_PREREQS = [
  'JavaScript to the level of classes, modules, promises and async/await. No framework experience is assumed.',
  'An Odoo instance you can restart and break. A local Docker container is ideal; do not learn on anything a client uses.',
  'Enough Python and Odoo to know what a model and a view are. You will not be asked to write much Python.',
];

export const COURSE_TITLE = 'Odoo OWL development, from nothing to production';

export const COURSE_DESCRIPTION =
  'A full course in the OWL framework Odoo runs on: components, reactivity, the lifecycle, services, registries, field widgets, client actions, testing and the faults that only appear on live systems.';
