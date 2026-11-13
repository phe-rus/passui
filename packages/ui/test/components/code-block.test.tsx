import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { CodeBlock } from "../../src/components/code-block";

test("plain code preserves line breaks and escapes markup without a highlighter", () => {
	const html = renderToStaticMarkup(
		<CodeBlock code={"<button>\n\nconst ready = true"} />,
	);
	expect(html).toContain('data-line-numbers="true"');
	expect(html).toContain(
		'&lt;button&gt;</span>\n<span class="line"> </span>\n',
	);
	expect(html).not.toContain("<button>");
	expect(
		renderToStaticMarkup(<CodeBlock code="bun install" lineNumbers={false} />),
	).not.toContain("data-line-numbers");
});

test("code can carry a caption, its language and a copy button", () => {
	const html = renderToStaticMarkup(
		<CodeBlock
			code="bun add @passui/react"
			title="install.sh"
			language="Shell"
			copyable
		/>,
	);
	expect(html).toContain("install.sh");
	expect(html).toContain("Shell");
	expect(html).toContain('aria-label="Copy code"');
	// Plain code stays plain: no header, no button.
	const plain = renderToStaticMarkup(
		<CodeBlock code="bun add @passui/react" />,
	);
	expect(plain).not.toContain("Copy code");
});

test("long code starts folded with an Expand code button, short code does not", () => {
	const long = Array.from({ length: 10 }, (_, i) => `line ${i}`).join("\n");
	const folded = renderToStaticMarkup(<CodeBlock code={long} foldAfter={6} />);
	expect(folded).toContain("Expand code");
	expect(folded).toContain('aria-expanded="false"');
	expect(
		renderToStaticMarkup(<CodeBlock code="one\ntwo" foldAfter={6} />),
	).not.toContain("Expand code");
});
