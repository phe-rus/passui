// @vitest-environment jsdom
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { expect, it, vi } from "vitest";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../src/components/accordion";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../../src/components/alert-dialog";
import { Checkbox } from "../../src/components/checkbox";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "../../src/components/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from "../../src/components/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../src/components/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../src/components/popover";
import { Select } from "../../src/components/select";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "../../src/components/sheet";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../src/components/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "../../src/components/tooltip";
import { act } from "../helpers/axe";

const cases: Record<string, React.ReactElement> = {
	dialog: (
		<Dialog>
			<DialogTrigger>Open</DialogTrigger>
			<DialogContent>
				<DialogTitle>T</DialogTitle>
			</DialogContent>
		</Dialog>
	),
	alertDialog: (
		<AlertDialog>
			<AlertDialogTrigger>Open</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>T</AlertDialogTitle>
			</AlertDialogContent>
		</AlertDialog>
	),
	sheet: (
		<Sheet>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent>
				<SheetTitle>T</SheetTitle>
			</SheetContent>
		</Sheet>
	),
	drawer: (
		<Drawer>
			<DrawerTrigger>Open</DrawerTrigger>
			<DrawerContent>
				<DrawerTitle>T</DrawerTitle>
			</DrawerContent>
		</Drawer>
	),
	popover: (
		<Popover>
			<PopoverTrigger>Open</PopoverTrigger>
			<PopoverContent>Body</PopoverContent>
		</Popover>
	),
	tooltip: (
		<Tooltip>
			<TooltipTrigger>Hover</TooltipTrigger>
			<TooltipContent>Tip</TooltipContent>
		</Tooltip>
	),
	dropdownMenu: (
		<DropdownMenu>
			<DropdownMenuTrigger>Menu</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem value="a">A</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	accordion: (
		<Accordion>
			<AccordionItem value="a">
				<AccordionTrigger>Q</AccordionTrigger>
				<AccordionContent>A</AccordionContent>
			</AccordionItem>
		</Accordion>
	),
	checkbox: <Checkbox>Agree</Checkbox>,
	select: <Select aria-label="S" items={[{ value: "a", label: "A" }]} />,
	tabs: (
		<Tabs defaultValue="a">
			<TabsList>
				<TabsTrigger value="a">A</TabsTrigger>
			</TabsList>
			<TabsContent value="a">One</TabsContent>
		</Tabs>
	),
};

for (const [name, ui] of Object.entries(cases))
	it(`${name} renders on the server and hydrates without a mismatch`, async () => {
		const errors = vi.spyOn(console, "error").mockImplementation(() => {});
		const host = document.createElement("div");
		host.innerHTML = renderToString(ui);
		document.body.append(host);
		await act(async () => {
			hydrateRoot(host, ui);
		});
		expect(
			errors.mock.calls
				.map((c) => String(c[0]))
				.filter((m) => /hydrat|did not match|mismatch/i.test(m)),
		).toEqual([]);
		errors.mockRestore();
		host.remove();
	});
