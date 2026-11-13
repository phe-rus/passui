import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../../src/components/empty";
import { LabeledContent } from "../../src/components/labeled-content";
import { Locales } from "../../src/components/locales";
import { SwatchPicker } from "../../src/components/swatch-picker";

test("empty states compose their parts and hide the decorative media", () => {
	const html = renderToStaticMarkup(
		<Empty>
			<EmptyHeader>
				<EmptyMedia>
					<svg />
				</EmptyMedia>
				<EmptyTitle>No items</EmptyTitle>
				<EmptyDescription>Save your first item.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<button type="button">Add item</button>
			</EmptyContent>
		</Empty>,
	);
	expect(html).toContain('data-slot="empty"');
	expect(html).toContain('aria-hidden="true"');
	expect(html).toContain("Save your first item.");
	expect(html).toContain("Add item</button>");
});

test("labeled content accepts attributes without losing its content", () => {
	const markup = renderToStaticMarkup(
		<LabeledContent
			label="Name"
			description="Public name"
			id="name-row"
			className="custom-row"
		>
			<span>Niina</span>
		</LabeledContent>,
	);
	expect(markup).toContain('id="name-row"');
	expect(markup).toContain("custom-row");
	expect(markup).toContain("Public name");
	expect(markup).toContain("Niina");
});

test("a swatch picker marks only the chosen swatch", () => {
	const markup = renderToStaticMarkup(
		<SwatchPicker
			label="Accent"
			value="blush"
			onChange={() => {}}
			options={[
				{ value: "blush", label: "Blush", color: "pink", ink: "white" },
				{ value: "sea", label: "Sea", color: "teal", ink: "white" },
			]}
		/>,
	);
	expect(markup).toContain('aria-label="Accent"');
	expect(markup.match(/passui-swatch-check/g)).toHaveLength(1);
});

test("locales name each language in its own language", () => {
	const markup = renderToStaticMarkup(
		<Locales
			label="Language"
			locales={["en", "fr"]}
			locale="fr"
			onSelect={() => {}}
		/>,
	);
	expect(markup).toContain("Français");
});
