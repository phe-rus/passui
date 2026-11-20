import { Button } from "@passui/react/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@passui/react/dialog";
import { Input } from "@passui/react/input";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "@passui/react/sheet";
import { Switch } from "@passui/react/switch";
import { useEffect, useState } from "react";

const BACKDROP_RULE =
	'dialog::backdrop,[popover]::backdrop,[data-slot$="-overlay"],[data-slot$="-backdrop"]{bottom:4px!important}';

type Probe = { os: string; inner: string; visual: string; insets: string };

function readProbe(): Probe {
	const root = document.documentElement;
	const box = document.getElementById("lab-insets");
	const style = box ? getComputedStyle(box) : null;
	const visual = window.visualViewport;
	return {
		os: root.getAttribute("data-os") ?? "unset",
		inner: `${window.innerWidth} x ${window.innerHeight}`,
		visual: visual
			? `${Math.round(visual.width)} x ${Math.round(visual.height)}`
			: "none",
		insets: style
			? `top ${style.paddingTop}, bottom ${style.paddingBottom}`
			: "unknown",
	};
}

function useRootEffect(on: boolean, apply: () => () => void) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: apply is stable per toggle
	useEffect(() => (on ? apply() : undefined), [on]);
}

export function IosLab() {
	const [probe, setProbe] = useState<Probe | null>(null);
	const [asIos, setAsIos] = useState(false);
	const [overscroll, setOverscroll] = useState(false);
	const [shim, setShim] = useState(false);
	const [backdrop, setBackdrop] = useState(false);

	useEffect(() => {
		const update = () => setProbe(readProbe());
		update();
		window.visualViewport?.addEventListener("resize", update);
		window.addEventListener("resize", update);
		return () => {
			window.visualViewport?.removeEventListener("resize", update);
			window.removeEventListener("resize", update);
		};
	}, [asIos]);

	useRootEffect(asIos, () => {
		const root = document.documentElement;
		const before = root.getAttribute("data-os");
		root.setAttribute("data-os", "ios");
		return () => {
			if (before) root.setAttribute("data-os", before);
		};
	});

	useRootEffect(overscroll, () => {
		const root = document.documentElement;
		root.style.setProperty("--overscroll-color", "#e11d48");
		return () => root.style.removeProperty("--overscroll-color");
	});

	useRootEffect(shim, () => {
		const el = document.querySelector<HTMLElement>('[data-slot="edge-shim"]');
		if (el) el.style.backgroundColor = "#e11d48";
		return () => {
			if (el) el.style.backgroundColor = "";
		};
	});

	useRootEffect(backdrop, () => {
		const style = document.createElement("style");
		style.textContent = BACKDROP_RULE;
		document.head.appendChild(style);
		return () => style.remove();
	});

	return (
		<article className="mx-auto flex w-full max-w-xl flex-col gap-6 px-5 pb-40">
			<div
				id="lab-insets"
				aria-hidden="true"
				className="pointer-events-none fixed"
				style={{
					paddingTop: "env(safe-area-inset-top)",
					paddingBottom: "env(safe-area-inset-bottom)",
				}}
			/>

			<header className="glass-bar sticky top-0 z-40 -mx-5 px-5 py-3">
				<h1 className="text-headline">iOS lab</h1>
			</header>

			<section className="flex flex-col gap-1">
				<p className="text-footnote">
					Open on the iPhone, scroll, pull past both edges, open the sheet and
					dialog. Each switch applies one workaround so you can see what it
					changes.
				</p>
			</section>

			<section aria-label="Reading" className="flex flex-col gap-1 font-mono">
				<p className="text-caption">data-os: {probe?.os}</p>
				<p className="text-caption">layout viewport: {probe?.inner}</p>
				<p className="text-caption">visual viewport: {probe?.visual}</p>
				<p className="text-caption">safe area: {probe?.insets}</p>
			</section>

			<section aria-label="Workarounds" className="flex flex-col gap-4">
				<Switch checked={asIos} onCheckedChange={setAsIos}>
					Treat as iOS (solid glass, 16px fields)
				</Switch>
				<Switch checked={overscroll} onCheckedChange={setOverscroll}>
					Red overscroll colour
				</Switch>
				<Switch checked={shim} onCheckedChange={setShim}>
					Show the bottom edge shim in red
				</Switch>
				<Switch checked={backdrop} onCheckedChange={setBackdrop}>
					Lift backdrops 4px off the bottom
				</Switch>
			</section>

			<section aria-label="Overlays" className="flex flex-wrap gap-3">
				<Sheet side="bottom">
					<SheetTrigger className="bg-fill text-footnote rounded-xl px-4 py-2">
						Open sheet
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet</SheetTitle>
						<SheetDescription>
							Look for a strip under this sheet and a gap at the screen bottom.
						</SheetDescription>
						<Input placeholder="Type here (zoom check)" />
					</SheetContent>
				</Sheet>

				<Dialog>
					<DialogTrigger className="bg-fill text-footnote rounded-xl px-4 py-2">
						Open dialog
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Dialog</DialogTitle>
						<DialogDescription>
							Look at the backdrop's bottom edge.
						</DialogDescription>
						<Button>Close by tapping outside</Button>
					</DialogContent>
				</Dialog>
			</section>

			<section aria-label="Field zoom" className="flex flex-col gap-2">
				<Input placeholder="13px field: does the page zoom on focus?" />
			</section>

			<section aria-label="Scroll" className="flex flex-col gap-4">
				{Array.from({ length: 24 }, (_, index) => (
					<p key={index} className="text-footnote">
						Scroll row {index + 1}. The header above should stay put, stay solid
						on iOS, and the toolbar should collapse as you move.
					</p>
				))}
			</section>
		</article>
	);
}
