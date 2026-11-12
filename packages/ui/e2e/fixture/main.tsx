import { type ReactNode, useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../src/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerHandle,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "../../src/ui/drawer";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	type SheetSide,
	SheetTitle,
	SheetTrigger,
} from "../../src/ui/sheet";
import "./app.css";

declare global {
	interface Window {
		/** Sets the open state synchronously, so a test can reverse at an exact moment. */
		__setOpen: (open: boolean) => void;
	}
}

/**
 * ?ui=drawer | sheet | stack   which overlay to show (default drawer)
 * ?layers=dialog,sheet,drawer   for stack: each layer opens inside the last
 * ?side=left|right|top|bottom   for the sheet (default right)
 * ?page=off            leave `data-passui-page` off the page element
 */
const query = new URLSearchParams(location.search);
const ui = query.get("ui") ?? "drawer";
const side = (query.get("side") ?? "right") as SheetSide;

type Kind = "dialog" | "sheet" | "drawer";

/**
 * One layer of a stack. Its panel holds an input and the trigger of the next
 * layer, so a test can open layers one inside another. Test ids carry the depth.
 */
function Layer({ kinds, depth = 0 }: { kinds: Kind[]; depth?: number }) {
	const [kind, ...rest] = kinds;
	const inner: ReactNode = (
		<>
			<input data-testid={`input-${depth}`} aria-label={`Input ${depth}`} />
			{rest.length > 0 && <Layer kinds={rest} depth={depth + 1} />}
		</>
	);
	const trigger = { "data-testid": `trigger-${depth}` };
	const panel = { "data-testid": `panel-${depth}` };
	if (kind === "dialog")
		return (
			<Dialog>
				<DialogTrigger {...trigger}>Open dialog {depth}</DialogTrigger>
				<DialogContent {...panel}>
					<DialogHeader>
						<DialogTitle>Dialog {depth}</DialogTitle>
					</DialogHeader>
					{inner}
				</DialogContent>
			</Dialog>
		);
	if (kind === "sheet")
		return (
			<Sheet>
				<SheetTrigger {...trigger}>Open sheet {depth}</SheetTrigger>
				<SheetContent {...panel}>
					<SheetHeader>
						<SheetTitle>Sheet {depth}</SheetTitle>
					</SheetHeader>
					{inner}
				</SheetContent>
			</Sheet>
		);
	return (
		<Drawer>
			<DrawerTrigger {...trigger}>Open drawer {depth}</DrawerTrigger>
			<DrawerContent {...panel}>
				<DrawerHandle />
				<DrawerHeader>
					<DrawerTitle>Drawer {depth}</DrawerTitle>
				</DrawerHeader>
				{inner}
			</DrawerContent>
		</Drawer>
	);
}

function App() {
	const [open, setOpen] = useState(false);
	useLayoutEffect(() => {
		window.__setOpen = (value) => flushSync(() => setOpen(value));
	}, []);
	const body = <div className="h-64 px-6" data-testid="body" />;
	return (
		<main
			data-testid="page"
			data-passui-page={query.get("page") === "off" ? undefined : ""}
			className="bg-background text-label min-h-dvh p-6"
		>
			{ui === "stack" ? (
				<Layer
					kinds={(query.get("layers") ?? "dialog,dialog").split(",") as Kind[]}
				/>
			) : ui === "sheet" ? (
				<Sheet open={open} onOpenChange={(d) => setOpen(d.open)} side={side}>
					<SheetTrigger data-testid="trigger">Open</SheetTrigger>
					<SheetContent data-testid="panel">
						<SheetHeader>
							<SheetTitle>Sheet</SheetTitle>
						</SheetHeader>
						{body}
					</SheetContent>
				</Sheet>
			) : (
				<Drawer open={open} onOpenChange={(d) => setOpen(d.open)}>
					<DrawerTrigger data-testid="trigger">Open</DrawerTrigger>
					<DrawerContent data-testid="panel">
						<DrawerHandle />
						<DrawerHeader>
							<DrawerTitle>Drawer</DrawerTitle>
						</DrawerHeader>
						{body}
					</DrawerContent>
				</Drawer>
			)}
		</main>
	);
}

const root = document.getElementById("root");
if (root) createRoot(root).render(<App />);
