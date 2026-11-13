import { InboxIcon } from "@passui/icons/inbox";
import { Button } from "@passui/react/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { Text } from "@passui/react/text";

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
								<Text as="span" size="subheadline" weight="medium">
									No applications yet
								</Text>
								<Text as="span" size="footnote" tone="secondary">
									Apps you create appear here.
								</Text>
								<Button size="sm" className="mt-2">
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
