import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";
import { Badge } from "@passui/react/badge";
import { Button } from "@passui/react/button";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import { Text } from "@passui/react/text";

const members = [
	{
		name: "Aiko Kamado",
		email: "aiko@example.com",
		initials: "AK",
		src: "/avatars/aiko.svg",
		role: "Owner",
		online: true,
	},
	{
		name: "Kenji Mori",
		email: "kenji@example.com",
		initials: "KM",
		src: "/avatars/kenji.svg",
		role: "Admin",
		online: false,
	},
	{
		name: "Mira Patel",
		email: "mira@example.com",
		initials: "MP",
		src: "/avatars/mira.svg",
		role: "Member",
		online: true,
	},
];

export function TableShowcase() {
	return (
		<div className="bg-elevated ring-separator/60 w-full max-w-xl rounded-4xl p-4 shadow-sm ring-1">
			<Table>
				<TableCaption>3 members</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Member</TableHead>
						<TableHead>Role</TableHead>
						<TableHead>Status</TableHead>
						<TableHead>
							<span className="sr-only">Actions</span>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{members.map((member) => (
						<TableRow key={member.email}>
							<TableCell>
								<div className="flex items-center gap-3">
									<Avatar className="size-8">
										<AvatarImage src={member.src} />
										<AvatarFallback>{member.initials}</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<Text as="span" size="subheadline" weight="medium">
											{member.name}
										</Text>
										<Text as="span" size="caption" tone="secondary">
											{member.email}
										</Text>
									</div>
								</div>
							</TableCell>
							<TableCell>{member.role}</TableCell>
							<TableCell>
								<Badge variant={member.online ? "success" : "secondary"}>
									{member.online ? "Online" : "Away"}
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									Manage
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
