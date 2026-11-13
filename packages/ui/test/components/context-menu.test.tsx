// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { afterEach, expect, it } from "vitest";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../../src/components/context-menu";
import { act, settle } from "../helpers/axe";

let root: Root | undefined;
afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	document.body.innerHTML = "";
	root = undefined;
});

it("opens a menu on contextmenu and not before", async () => {
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () =>
		root?.render(
			<ContextMenu>
				<ContextMenuTrigger>Region</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem>Copy</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>,
		),
	);
	expect(document.body.textContent).not.toContain("Copy");
	const region = host.querySelector('[data-slot="context-menu-trigger"]');
	expect(region).not.toBeNull();
	await act(async () => {
		region?.dispatchEvent(
			new MouseEvent("contextmenu", {
				bubbles: true,
				cancelable: true,
				clientX: 20,
				clientY: 30,
			}),
		);
	});
	await settle();
	expect(document.body.textContent).toContain("Copy");
});
