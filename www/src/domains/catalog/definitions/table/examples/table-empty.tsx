import { InboxIcon } from "@passui/react/icons";

import { Button } from "@passui/react/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";

export function TableEmpty() {
	return (
		<div className="bg-elevated ring-separator/60 w-full max-w-md rounded-4xl p-4 shadow-sm ring-1">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Application</TableHead>
						<TableHead>Created</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					<TableRow className="hover:bg-transparent">
						<TableCell colSpan={2}>
							<div className="flex flex-col items-center gap-2 py-8 text-center">
								<InboxIcon size={28} className="text-label-tertiary" />
								<span className="text-subheadline text-label font-medium">
									No applications yet
								</span>
								<span className="text-footnote text-label-secondary">
									Apps you create appear here.
								</span>
								<Button variant="accent" size="sm" className="mt-2">
									New application
								</Button>
							</div>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
