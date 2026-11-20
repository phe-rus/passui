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

const DIM = "color-mix(in srgb, var(--color-background) 70%, black)";

interface Candidate {
	key: string;
	label: string;
	css: string;
}

/** Each candidate is one CSS block applied while its switch is on. */
const CANDIDATES: Candidate[] = [
	{
		key: "noanim",
		label: "I. REMOVE the scroll-driven colour animation on html",
		css: "html{animation:none!important}",
	},
	{
		key: "notrans",
		label: "J. REMOVE the body background transition",
		css: "body{transition:none!important}",
	},
	{
		key: "nolock",
		label:
			"L. CANCEL the scroll lock (the dialog sets overflow:hidden and pointer-events:none on body)",
		css: "html body{overflow:visible!important;overflow-x:clip!important;pointer-events:auto!important}",
	},
	{
		key: "nocolorscheme",
		label: "N. Cancel the explicit color-scheme on html",
		css: "html{color-scheme:normal!important}",
	},
	{
		key: "noblur",
		label: "B. No blur on overlays",
		css: `[data-slot$="-overlay"]{backdrop-filter:none!important}`,
	},
	{
		key: "solid",
		label: "C. Opaque dimmed overlay (no translucency, no blur)",
		css: `[data-slot$="-overlay"]{background-color:${DIM}!important;backdrop-filter:none!important}`,
	},
	{
		key: "body",
		label: "D. Dim the page background itself while an overlay is open",
		css: `:root:has([data-slot$="-overlay"]),:root:has([data-slot$="-overlay"]) body{background-color:${DIM}!important}`,
	},
	{
		key: "inert",
		label: "E. Overlay inset by 1px on every side",
		css: `[data-slot$="-overlay"]{inset:1px!important}`,
	},
];

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

function useStyle(on: boolean, css: string) {
	useEffect(() => {
		if (!on) return undefined;
		const style = document.createElement("style");
		style.textContent = css;
		document.head.appendChild(style);
		return () => {
			style.remove();
		};
	}, [on, css]);
}

function Candidates({ active }: { active: Record<string, boolean> }) {
	useStyle(
		true,
		CANDIDATES.filter((c) => active[c.key])
			.map((c) => c.css)
			.join("\n"),
	);
	return null;
}

export function IosLab() {
	const [probe, setProbe] = useState<Probe | null>(null);
	const [asIos, setAsIos] = useState(false);
	const [pill, setPill] = useState(false);
	const [active, setActive] = useState<Record<string, boolean>>({});

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

	useEffect(() => {
		if (!asIos) return;
		const root = document.documentElement;
		const before = root.getAttribute("data-os");
		root.setAttribute("data-os", "ios");
		return () => {
			if (before) root.setAttribute("data-os", before);
		};
	}, [asIos]);

	return (
		<article className="mx-auto flex w-full max-w-xl flex-col gap-6 px-5 pb-40">
			<Candidates active={active} />
			<div
				id="lab-insets"
				aria-hidden="true"
				className="pointer-events-none fixed"
				style={{
					paddingTop: "env(safe-area-inset-top)",
					paddingBottom: "env(safe-area-inset-bottom)",
				}}
			/>

			{pill && (
				<div className="bg-fill/60 text-footnote fixed right-4 bottom-4 z-40 rounded-xl px-3 py-2">
					Fixed pill, like Pass's language switcher
				</div>
			)}

			<header className="glass-bar sticky top-0 z-40 -mx-5 px-5 py-3">
				<h1 className="text-headline">iOS lab</h1>
			</header>

			<section className="flex flex-col gap-1">
				<p className="text-footnote">
					Open the sheet or dialog, look at the floating bar at the bottom of
					Safari, and note whether it keeps the dimmed look. Turn on one switch
					at a time, close and reopen the overlay, then try combinations.
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
				<Switch checked={pill} onCheckedChange={setPill}>
					Fixed pill 16px from the bottom (the language switcher)
				</Switch>
				{CANDIDATES.map((c) => (
					<Switch
						key={c.key}
						checked={!!active[c.key]}
						onCheckedChange={(on) =>
							setActive((state) => ({ ...state, [c.key]: on }))
						}
					>
						{c.label}
					</Switch>
				))}
			</section>

			<section aria-label="Overlays" className="flex flex-wrap gap-3">
				<Sheet side="bottom">
					<SheetTrigger className="bg-fill text-footnote rounded-xl px-4 py-2">
						Open sheet
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>Sheet</SheetTitle>
						<SheetDescription>
							Check the floating bar under this sheet.
						</SheetDescription>
						<Input placeholder="Type here (zoom check)" />
					</SheetContent>
				</Sheet>

				<Sheet side="top">
					<SheetTrigger className="bg-fill text-footnote rounded-xl px-4 py-2">
						Open top sheet
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>Top sheet</SheetTitle>
						<SheetDescription>
							Check the status bar area above this sheet.
						</SheetDescription>
					</SheetContent>
				</Sheet>

				<Dialog>
					<DialogTrigger className="bg-fill text-footnote rounded-xl px-4 py-2">
						Open dialog
					</DialogTrigger>
					<DialogContent>
						<DialogTitle>Dialog</DialogTitle>
						<DialogDescription>
							Check the floating bar behind this dialog.
						</DialogDescription>
						<Button>Tap outside to close</Button>
					</DialogContent>
				</Dialog>
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
