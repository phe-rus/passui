import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { DataTable } from "../src/tables/data-table";

type RecordRow = { id: string; name: string };
const records: RecordRow[] = [{ id: "1", name: "Aiko" }];
const columns = [{ accessorKey: "name", header: "Name" }];

test("sortable column headers are keyboard-operable and expose sort state", () => {
	const markup = renderToStaticMarkup(
		<DataTable
			data={records}
			columns={columns}
			getRowId={(row) => row.id}
			aria-label="People"
			pagination={false}
		/>,
	);
	expect(markup).toContain('aria-label="People"');
	expect(markup).toContain('aria-sort="none"');
	expect(markup).toContain('<button type="button"');
	expect(markup).toContain("Aiko");
});

test("empty tables retain their accessible label and fallback", () => {
	const markup = renderToStaticMarkup(
		<DataTable
			data={[] as RecordRow[]}
			columns={columns}
			getRowId={(row) => row.id}
			aria-label="People"
			emptyMessage="Nothing here"
			pagination={false}
		/>,
	);
	expect(markup).toContain("Nothing here");
	expect(markup).toContain('aria-label="People"');
});
