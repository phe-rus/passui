import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@passui/react/table";
import type { AnyControl, RegisteredDocs } from "@/domains/catalog/definitions";
import reactApi from "../react-api.generated.json";
import { ApiPropsTable, type ApiReference } from "./api-props-table";

const references: Record<string, ApiReference> = reactApi;

type PropsTableProps = {
	docs: RegisteredDocs;
	descriptions: Record<string, string>;
};

function TypeOf({ control }: { control: AnyControl }) {
	if (control.kind !== "select")
		return (
			<>
				{control.kind === "boolean"
					? "boolean"
					: control.kind === "number"
						? "number"
						: "string"}
			</>
		);
	return (
		<span className="flex flex-wrap gap-1">
			{Object.keys(control.options).map((option) => (
				<code
					key={option}
					className="bg-fill/70 rounded-md px-1.5 py-0.5 whitespace-nowrap"
				>
					"{option}"
				</code>
			))}
		</span>
	);
}

function defaultOf(control: AnyControl) {
	return typeof control.default === "string"
		? `"${control.default}"`
		: String(control.default);
}

/** Every documented prop: its name, type, default and purpose. */
export function PropsTable({ docs, descriptions }: PropsTableProps) {
	const reference = references[docs.slug];
	if (reference)
		return <ApiPropsTable reference={reference} descriptions={descriptions} />;
	return (
		<div className="ring-separator/60 overflow-x-auto rounded-3xl ring-1">
			<Table className="w-full min-w-160 border-collapse text-left">
				<TableHeader className="bg-fill/50 *:text-sm!">
					<TableRow>
						<TableHead className="px-3 py-2">Prop</TableHead>
						<TableHead className="px-3 py-2">Type</TableHead>
						<TableHead className="px-3 py-2">Default</TableHead>
						<TableHead className="px-3 py-2">Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="*:text-xs!">
					{Object.entries(docs.controls).map(([name, control]) =>
						control ? (
							<TableRow
								key={name}
								className="border-separator/60 border-t align-top"
							>
								<TableCell className="px-3 py-2 font-mono font-semibold wrap-normal whitespace-normal whitespace-nowrap">
									{name}
								</TableCell>
								<TableCell className="max-w-72 px-3 py-2 font-mono wrap-normal whitespace-normal">
									<TypeOf control={control} />
								</TableCell>
								<TableCell className="px-3 py-2 font-mono wrap-normal whitespace-normal whitespace-nowrap">
									{defaultOf(control)}
								</TableCell>
								<TableCell className="px-3 py-2 whitespace-normal">
									{descriptions[name]}
								</TableCell>
							</TableRow>
						) : null,
					)}
				</TableBody>
			</Table>
		</div>
	);
}
