import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { Dialog } from "../../src/components/dialog/dialog";
import type { SheetPlacement } from "../../src/components/sheet/sheet";

const validPlacement: SheetPlacement = "center";
// @ts-expect-error unsupported placements must fail type checking
const invalidPlacement: SheetPlacement = "top";
void validPlacement;
void invalidPlacement;

test("dialog delegates modal presentation to Sheet's single portal boundary", () => {
	const markup = renderToStaticMarkup(
		<Dialog
			open
			onOpenChange={() => {}}
			title="Settings"
			description="Update settings"
		>
			<span>Settings content</span>
		</Dialog>,
	);
	expect(markup).toContain('<span hidden="" aria-hidden="true"></span>');
	expect(markup).not.toContain("Settings content");
});

test("inline dialogs render their content without a portal", () => {
	const markup = renderToStaticMarkup(
		<Dialog open onOpenChange={() => {}} title="Details" presentation="inline">
			<span>Details content</span>
		</Dialog>,
	);
	expect(markup).toContain("Details content");
});
