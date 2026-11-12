import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";

const members = [
	{
		name: "Aiko Kamado",
		initials: "AK",
		src: "/avatars/aiko.svg",
		role: "Owner",
	},
	{
		name: "Kenji Mori",
		initials: "KM",
		src: "/avatars/kenji.svg",
		role: "Admin",
	},
];

export function TableUsage() {
	return (
		<div className="bg-elevated ring-separator/60 w-full max-w-md rounded-4xl p-4 shadow-sm ring-1">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Member</TableHead>
						<TableHead>Role</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member.name}>
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="size-8">
										<AvatarImage src={member.src} />
										<AvatarFallback>{member.initials}</AvatarFallback>
									</Avatar>
									<span className="text-subheadline text-label font-medium">
										{member.name}
									</span>
								</div>
							</TableCell>
							<TableCell>{member.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
