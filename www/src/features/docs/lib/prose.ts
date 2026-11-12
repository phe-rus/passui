/**
 * Spacing for docs pages. `typeset` styles text but leaves every block margin
 * at zero, so the page sets its own rhythm here: generous above headings,
 * tighter between a heading and what it introduces.
 */
export const prose = [
	"typeset",
	"typeset-h2:mt-10 typeset-h2:mb-2 typeset-h2:text-title3 typeset-h2:scroll-mt-24 typeset-h2:first:mt-0",
	"typeset-h3:mt-6 typeset-h3:mb-1.5 typeset-h3:text-headline typeset-h3:scroll-mt-24 typeset-h3:first:mt-0",
	"typeset-p:mt-2 typeset-ul:mt-2 typeset-ol:mt-2",
	"typeset-li:mt-1 typeset-pre:mt-3 typeset-table:mt-3",
	"typeset-blockquote:mt-3 typeset-hr:my-6",
].join(" ");

/** The three column grid: sidebar | content centred | "On this page" at the far edge. */
export const pageGrid =
	"grid w-full gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,48rem)_minmax(0,1fr)]";

/** The article sits in the middle column. */
export const pageColumn = "xl:col-start-2";

/** The outline rail hugs the right edge, like shadcn. */
export const pageRail =
	"hidden xl:col-start-3 xl:block xl:w-52 xl:justify-self-end";
