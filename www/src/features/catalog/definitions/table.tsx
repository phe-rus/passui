import { TableEmpty } from "../examples/table/empty";
import { TableInvoices } from "../examples/table/invoices";
import { TableSelection } from "../examples/table/selection";
import { TableShowcase } from "../examples/table/showcase";
import { TableUsage } from "../examples/table/usage";
import { TableWide } from "../examples/table/wide";
import type { ComponentDoc } from "../types";

export const doc: ComponentDoc = {
	examples: [
		{
			id: "empty",
			title: "Empty state",
			description:
				"One row spanning every column says there's nothing yet and offers the next step.",
			Demo: TableEmpty,
		},
		{
			id: "invoices",
			title: "Totals and status",
			description:
				"A caption, a status for each row, right-aligned amounts and a footer with the total.",
			Demo: TableInvoices,
		},
		{
			id: "selection",
			title: "Selectable rows",
			description:
				"Checkbox toggles in the first column. A selected row sets data-state to selected and is shaded.",
			Demo: TableSelection,
		},
		{ id: "showcase", title: "Showcase", description: "", Demo: TableShowcase },
		{ id: "usage", title: "Usage", description: "", Demo: TableUsage },
		{
			id: "wide",
			title: "Wide tables",
			description:
				"When there are more columns than fit, the table scrolls sideways inside its card instead of stretching the page.",
			Demo: TableWide,
		},
	],
	accessibility: [
		"Right-align numbers and use tabular-nums, so digits line up.",
		"Give every column a heading. Hide it with sr-only if the column holds only actions.",
	],
};
