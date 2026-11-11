import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from "@passui/react/table";
import type { AnatomyPart } from "../types";

type AnatomyTableProps = {
	parts: AnatomyPart[];
};

/** The parts a component is made of, and what each one does. */
export function AnatomyTable({ parts }: AnatomyTableProps) {
	return (
		<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
			<Table className="w-full border-collapse text-left">
				<TableHeader className="bg-fill/50 *:text-subheadline!">
					<TableRow>
						<TableHead className="w-36 px-4 py-2.5">Element</TableHead>
						<TableHead className="px-4 py-2.5">Description</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="*:text-caption!">
					{parts.map((part) => (
						<TableRow
							key={part.element}
							className="border-separator/60 border-t align-top"
						>
							<TableCell className="px-4 py-2.5 font-semibold whitespace-normal">
								{part.element}
							</TableCell>
							<TableCell className="px-4 py-2.5 whitespace-normal">
								{part.required && <strong>Required. </strong>}
								{part.description}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
