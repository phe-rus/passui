import { createHighlighterCoreSync } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import css from "shiki/langs/css.mjs";
import html from "shiki/langs/html.mjs";
import shell from "shiki/langs/shellscript.mjs";
import tsx from "shiki/langs/tsx.mjs";
import dark from "shiki/themes/dark-plus.mjs";
import light from "shiki/themes/light-plus.mjs";

const shiki = createHighlighterCoreSync({
	themes: [light, dark],
	langs: [tsx, shell, css, html],
	engine: createJavaScriptRegexEngine(),
});

/**
 * Code as HTML in the VS Code themes, both written as variables so the page
 * picks the one for its scheme. Synchronous, so the Markdown renderer can use
 * it at build time and the server can use it per request. Never imported by
 * client code.
 */
export function highlight(code: string, lang = "tsx") {
	const options = {
		themes: { light: "light-plus", dark: "dark-plus" },
		defaultColor: false,
	} as const;
	try {
		return shiki.codeToHtml(code.trimEnd(), { lang, ...options });
	} catch {
		// A language that is not loaded is shown as plain text.
		return shiki.codeToHtml(code.trimEnd(), { lang: "text", ...options });
	}
}
