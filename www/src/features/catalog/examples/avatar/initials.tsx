import { Avatar, AvatarFallback } from "@passui/react/avatar";

export function AvatarInitials() {
	return (
		<div className="flex gap-3">
			<Avatar className="size-8">
				<AvatarFallback>KE</AvatarFallback>
			</Avatar>
			<Avatar>
				<AvatarFallback>AI</AvatarFallback>
			</Avatar>
			<Avatar className="size-14">
				<AvatarFallback>MI</AvatarFallback>
			</Avatar>
		</div>
	);
}
