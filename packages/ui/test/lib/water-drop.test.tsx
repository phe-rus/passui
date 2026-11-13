// @vitest-environment jsdom
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "../../src/components/context-menu";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../src/components/dropdown-menu";
import {
	alignSelectedOption,
	anchorOnTrigger,
	boxKeyframe,
	canMorph,
	pointBox,
	readBox,
	type TriggerAnchor,
	toMs,
	useAnchorFollow,
} from "../../src/lib/water-drop";
import { act, settle } from "../helpers/axe";

let root: Root | undefined;

afterEach(async () => {
	if (root) await act(async () => root?.unmount());
	document.body.innerHTML = "";
	root = undefined;
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

it("describes a box as a transform, a size and a radius", () => {
	expect(
		boxKeyframe({ left: 12, top: 40, width: 36, height: 36, radius: 18 }),
	).toEqual({
		transform: "translate(12px, 40px)",
		width: "36px",
		height: "36px",
		borderRadius: "18px",
	});
});

it("reads a box and caps the radius at a full pill", () => {
	const el = document.createElement("button");
	el.style.borderRadius = "9999px";
	document.body.append(el);
	vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
		left: 10,
		top: 20,
		width: 40,
		height: 30,
		right: 50,
		bottom: 50,
		x: 10,
		y: 20,
		toJSON: () => ({}),
	});
	expect(readBox(el)).toEqual({
		left: 10,
		top: 20,
		width: 40,
		height: 30,
		radius: 15,
	});
});

it("converts CSS times to milliseconds", () => {
	expect(toMs("450ms", 1)).toBe(450);
	expect(toMs("0.5s", 1)).toBe(500);
	expect(toMs("", 480)).toBe(480);
});

it("does not morph without the Web Animations API", () => {
	expect(canMorph()).toBe(false);
});

it("does not morph under Reduce Motion", () => {
	Element.prototype.animate = vi.fn() as never;
	vi.stubGlobal(
		"matchMedia",
		vi.fn(() => ({ matches: true })),
	);
	expect(canMorph()).toBe(false);
	delete (Element.prototype as { animate?: unknown }).animate;
});

beforeEach(() => {
	// Frames run synchronously so the settle loop finishes inside `act`.
	vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
		fn(0);
		return 1;
	});
});

it("grows a menu out of its trigger and hands the trigger back on close", async () => {
	// A running animation: it has not finished, so the ghost is still on screen.
	const finished = new Promise<void>(() => {});
	const animate = vi.fn(function (this: Element) {
		return {
			pause: vi.fn(),
			play: vi.fn(),
			cancel: vi.fn(),
			finished,
			onfinish: null,
		};
	});
	Element.prototype.animate = animate as never;
	vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
		left: 0,
		top: 0,
		width: 120,
		height: 80,
		right: 120,
		bottom: 80,
		x: 0,
		y: 0,
		toJSON: () => ({}),
	});

	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	const menu = (open: boolean) => (
		<DropdownMenu open={open}>
			<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Rename</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
	await act(async () => root?.render(menu(false)));
	await act(async () => root?.render(menu(true)));
	await settle();

	const panel = document.querySelector("[data-slot=dropdown-menu-content]");
	expect(panel?.hasAttribute("data-morph")).toBe(true);
	// The glass that travels is its own layer, so the menu's text never stretches.
	expect(document.querySelectorAll("[data-slot=water-drop]")).toHaveLength(1);
	// Geometry, fade, the trigger giving way and the panel's own content fade.
	expect(animate).toHaveBeenCalledTimes(4);
	const targets = animate.mock.contexts.map((el) => el as Element);
	expect(targets.some((el) => el.id.includes("trigger"))).toBe(true);

	// Closing drops the glass back: a new layer, the panel's fade and the trigger returning.
	animate.mockClear();
	await act(async () => root?.render(menu(false)));
	await settle();
	expect(animate).toHaveBeenCalledTimes(4);

	delete (Element.prototype as { animate?: unknown }).animate;
});

const trigger = {
	getBoundingClientRect: () =>
		({
			left: 300,
			top: 40,
			right: 336,
			bottom: 76,
			width: 36,
			height: 36,
		}) as DOMRect,
};

it("lands the glass where the panel ends up when the panel moves after it looked settled", async () => {
	const setKeyframes = vi.fn();
	const finished = new Promise<void>(() => {});
	const animate = vi.fn(() => ({
		pause: vi.fn(),
		play: vi.fn(),
		cancel: vi.fn(),
		finished,
		onfinish: null,
		playState: "running",
		effect: { setKeyframes },
	}));
	Element.prototype.animate = animate as never;
	const box = { top: 0, height: 80 };
	vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(
		() =>
			({
				left: 0,
				top: box.top,
				width: 120,
				height: box.height,
				right: 120,
				bottom: box.top + box.height,
				x: 0,
				y: box.top,
				toJSON: () => ({}),
			}) as DOMRect,
	);

	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	const menu = (open: boolean) => (
		<DropdownMenu open={open}>
			<DropdownMenuTrigger>Actions</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Rename</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
	// The positioner watches layout shifts, which jsdom cannot do.
	vi.stubGlobal(
		"IntersectionObserver",
		class {
			observe() {}
			unobserve() {}
			disconnect() {}
			takeRecords() {
				return [];
			}
		},
	);
	// Frames are stepped by hand so the panel can move between two of them.
	const queue: FrameRequestCallback[] = [];
	vi.stubGlobal("requestAnimationFrame", (fn: FrameRequestCallback) => {
		queue.push(fn);
		return queue.length;
	});
	const frame = () =>
		act(async () => {
			for (const fn of queue.splice(0)) fn(0);
		});
	await act(async () => root?.render(menu(false)));
	await act(async () => root?.render(menu(true)));
	await frame();
	await frame();
	await frame();
	expect(document.querySelectorAll("[data-slot=water-drop]")).toHaveLength(1);
	await frame();
	expect(setKeyframes).not.toHaveBeenCalled();

	// The positioner corrects the panel, as it does after a flip.
	box.top = 42;
	await frame();
	expect(setKeyframes).toHaveBeenCalled();
	const [, end] = setKeyframes.mock.calls.at(-1)?.[0] ?? [];
	expect(end.transform).toBe("translate(0px, 42px)");

	delete (Element.prototype as { animate?: unknown }).animate;
});

it("puts a downward panel's top edge on the trigger's top edge", () => {
	Element.prototype.animate = vi.fn() as never;
	// The machine adds a 6px gap below the anchor, so the anchor sits 6px above the trigger.
	expect(anchorOnTrigger("bottom-end", 6)(trigger)).toEqual({
		x: 300,
		y: 34,
		width: 36,
		height: 0,
	});
	delete (Element.prototype as { animate?: unknown }).animate;
});

it("puts an upward panel's bottom edge on the trigger's bottom edge", () => {
	Element.prototype.animate = vi.fn() as never;
	expect(anchorOnTrigger("top-start", 6)(trigger)?.y).toBe(82);
	delete (Element.prototype as { animate?: unknown }).animate;
});

it("puts a side panel's near edge on the trigger's matching edge", () => {
	Element.prototype.animate = vi.fn() as never;
	expect(anchorOnTrigger("right-start", 6)(trigger)).toEqual({
		x: 294,
		y: 40,
		width: 0,
		height: 36,
	});
	expect(anchorOnTrigger("left-start", 6)(trigger)?.x).toBe(342);
	delete (Element.prototype as { animate?: unknown }).animate;
});

it("follows a flip to the opposite side", () => {
	Element.prototype.animate = vi.fn() as never;
	const state = { flipped: true };
	expect(anchorOnTrigger("bottom", 6, state)(trigger)?.y).toBe(82);
	expect(anchorOnTrigger("right", 6, state)(trigger)?.x).toBe(342);
	delete (Element.prototype as { animate?: unknown }).animate;
});

interface ProbeProps {
	anchor: TriggerAnchor;
	side: string;
	reposition: (options: Pick<TriggerAnchor, "getAnchorRect">) => void;
}

function Probe({ anchor, side, reposition }: ProbeProps) {
	useAnchorFollow(anchor, true, side, reposition);
	return null;
}

it("repositions with its own anchor the first time the machine flips", async () => {
	const state = {};
	const anchor = {
		getAnchorRect: anchorOnTrigger("bottom-end", 6, state),
		state,
		base: "bottom",
	};
	const reposition = vi.fn();
	const host = document.createElement("div");
	document.body.append(host);
	root = createRoot(host);
	await act(async () =>
		root?.render(
			<Probe anchor={anchor} reposition={reposition} side="bottom" />,
		),
	);
	expect(reposition).not.toHaveBeenCalled();
	await act(async () =>
		root?.render(<Probe anchor={anchor} reposition={reposition} side="top" />),
	);
	// The anchor travels with the call, because Zag's menu overwrites its own.
	expect(reposition).toHaveBeenCalledTimes(1);
	expect(reposition).toHaveBeenCalledWith({
		getAnchorRect: anchor.getAnchorRect,
	});
	await act(async () =>
		root?.render(<Probe anchor={anchor} reposition={reposition} side="top" />),
	);
	expect(reposition).toHaveBeenCalledTimes(1);
});

it("moves a downward panel by the measured shift", () => {
	Element.prototype.animate = vi.fn() as never;
	expect(
		anchorOnTrigger("bottom-start", 6, { shift: () => -20 })(trigger)?.y,
	).toBe(14);
	// A flipped panel opens upward, where the shift does not apply.
	expect(
		anchorOnTrigger("bottom-start", 6, { flipped: true, shift: () => -20 })(
			trigger,
		)?.y,
	).toBe(82);
	delete (Element.prototype as { animate?: unknown }).animate;
});

it("leaves positioning alone where the morph does not run", () => {
	// No Web Animations API here: the panel keeps its normal place.
	expect(anchorOnTrigger("bottom-end", 6)(trigger)).toBeNull();
	Element.prototype.animate = vi.fn() as never;
	expect(anchorOnTrigger("bottom", 6)(null)).toBeNull();
	expect(anchorOnTrigger("auto", 6)(trigger)).toBeNull();
	delete (Element.prototype as { animate?: unknown }).animate;
});

it("lands the selected option on the trigger's value", () => {
	const list = document.createElement("div");
	const option = document.createElement("div");
	option.setAttribute("role", "option");
	option.setAttribute("data-state", "checked");
	list.append(option);
	Object.defineProperty(list, "offsetTop", { value: 10 });
	Object.defineProperty(option, "offsetTop", { value: 70 });
	Object.defineProperty(option, "offsetHeight", { value: 30 });
	Object.defineProperty(list, "scrollHeight", {
		value: 200,
		configurable: true,
	});
	Object.defineProperty(list, "clientHeight", { value: 200 });
	// Option centre is 75px into the list, trigger centre 18px: move up 57.
	expect(alignSelectedOption(trigger as unknown as Element, list)).toBe(-57);
	// A list that scrolls cannot keep the two together.
	Object.defineProperty(list, "scrollHeight", {
		value: 400,
		configurable: true,
	});
	expect(alignSelectedOption(trigger as unknown as Element, list)).toBe(0);
	expect(alignSelectedOption(trigger as unknown as Element, null)).toBe(0);
});

it("starts a context menu's glass as a round bead centered on the pointer", () => {
	expect(pointBox(100, 50)).toEqual({
		left: 94,
		top: 44,
		width: 12,
		height: 12,
		radius: 6,
	});
});

it("grows a context menu out of the pointer and leaves the region's face alone", async () => {
	const finished = new Promise<void>(() => {});
	const animate = vi.fn(() => ({
		pause: vi.fn(),
		play: vi.fn(),
		cancel: vi.fn(),
		finished,
		onfinish: null,
	}));
	Element.prototype.animate = animate as never;

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
	const region = host.querySelector('[data-slot="context-menu-trigger"]');
	await act(async () => {
		region?.dispatchEvent(
			new MouseEvent("contextmenu", {
				bubbles: true,
				cancelable: true,
				clientX: 120,
				clientY: 80,
			}),
		);
	});
	await settle();

	const panel = document.querySelector("[data-slot=dropdown-menu-content]");
	expect(panel?.hasAttribute("data-morph")).toBe(true);
	expect(document.querySelectorAll("[data-slot=water-drop]")).toHaveLength(1);
	// Geometry, fade and the panel's own content fade: no trigger face to hide.
	expect(animate).toHaveBeenCalledTimes(3);
	// The bead starts centered on the pointer (120, 80).
	const frames = (animate.mock.calls as unknown as [Keyframe[]][]).flatMap(
		([keyframes]) => keyframes,
	);
	expect(frames.some((f) => f.transform === "translate(114px, 74px)")).toBe(
		true,
	);

	delete (Element.prototype as { animate?: unknown }).animate;
});
