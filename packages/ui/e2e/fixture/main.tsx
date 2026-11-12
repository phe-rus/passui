import { useLayoutEffect, useState } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
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
 * ?ui=drawer | sheet   which overlay to show (default drawer)
 * ?side=left|right|top|bottom   for the sheet (default right)
 * ?page=off            leave `data-passui-page` off the page element
 */
const query = new URLSearchParams(location.search);
const ui = query.get("ui") ?? "drawer";
const side = (query.get("side") ?? "right") as SheetSide;

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
			{ui === "sheet" ? (
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
