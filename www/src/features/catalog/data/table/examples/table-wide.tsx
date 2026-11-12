import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";

const events = [
	{
		time: "09:41",
		event: "Signed in",
		person: "aiko@example.com",
		app: "Pass console",
		device: "MacBook Air",
		place: "Lisbon, PT",
	},
	{
		time: "09:12",
		event: "Passkey added",
		person: "kenji@example.com",
		app: "Accounts",
		device: "iPhone 16",
		place: "Porto, PT",
	},
	{
		time: "08:57",
		event: "Password changed",
		person: "mira@example.com",
		app: "Accounts",
		device: "Pixel 9",
		place: "Madrid, ES",
	},
];

export function TableWide() {
	// Table scrolls sideways inside its card when it's too wide
	return (
		<div className="bg-elevated ring-separator/60 w-full max-w-md rounded-4xl p-4 shadow-sm ring-1">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Time</TableHead>
						<TableHead>Event</TableHead>
						<TableHead>Person</TableHead>
						<TableHead>App</TableHead>
						<TableHead>Device</TableHead>
						<TableHead>Location</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{events.map((row) => (
						<TableRow key={row.time}>
							<TableCell className="text-label-secondary tabular-nums">
								{row.time}
							</TableCell>
							<TableCell className="text-label font-medium">
								{row.event}
							</TableCell>
							<TableCell>{row.person}</TableCell>
							<TableCell>{row.app}</TableCell>
							<TableCell>{row.device}</TableCell>
							<TableCell>{row.place}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
