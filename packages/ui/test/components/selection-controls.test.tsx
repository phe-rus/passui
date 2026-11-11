import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { ComboBox } from "../../src/components/combo-box/combo-box";
import { RadioGroup } from "../../src/components/radio-group/radio-group";
import { Breadcrumb } from "../../src/components/breadcrumb/breadcrumb";
import { Skeleton } from "../../src/components/skeleton/skeleton";

const options = [
	{ value: "one", label: "One" },
	{ value: "two", label: "Two", disabled: true },
];

test("combobox starts closed with the selected label and no dangling active descendant", () => {
	const html = renderToStaticMarkup(
		<ComboBox
			label="Choice"
			value="one"
			onChange={() => {}}
			options={options}
			emptyLabel="No matches"
		/>,
	);
	expect(html).toContain('role="combobox"');
	expect(html).toContain('aria-expanded="false"');
	expect(html).toContain(">One</span>");
	expect(html).not.toContain("aria-activedescendant");
	expect(html).not.toContain("aria-controls");
	expect(html).not.toContain('role="listbox"');
});

test("radio choices share a native name and expose selection and unavailable options", () => {
	const html = renderToStaticMarkup(
		<RadioGroup
			name="choice"
			label="Choice"
			value="one"
			onChange={() => {}}
			options={options}
		/>,
	);
	expect(html.match(/name="choice"/g)).toHaveLength(2);
	expect(html).toContain('checked="" value="one"');
	expect(html).toMatch(/<input[^>]*disabled=""[^>]*value="two"/);
	expect(html).toContain("<legend");
});

test("breadcrumb marks the final location and renders only ancestors as links", () => {
	const html = renderToStaticMarkup(
		<Breadcrumb
			label="Breadcrumb"
			items={[
				{ label: "Home", href: "/" },
				{ label: "Docs", href: "/docs" },
			]}
		/>,
	);
	expect(html).toContain('href="/"');
	expect(html).not.toContain('href="/docs"');
	expect(html).toContain('aria-current="page"');
	expect(html).toContain('class="not-typeset"');
	expect(html).toContain("gap-y-1 p-0");
	expect(html).toContain("gap-2 p-0");
});

test("skeletons announce a supplied loading label and otherwise remain decorative", () => {
	expect(renderToStaticMarkup(<Skeleton label="Loading" />)).toContain(
		'role="status"',
	);
	const decorative = renderToStaticMarkup(<Skeleton />);
	expect(decorative).toContain('aria-hidden="true"');
	expect(decorative).toContain("motion-safe:animate-pulse");
});
