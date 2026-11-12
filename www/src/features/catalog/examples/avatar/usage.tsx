import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";

export function AvatarUsage() {
	return (
		<Avatar>
			<AvatarImage src="/avatars/mira.svg" alt="Mira" />
			<AvatarFallback>MI</AvatarFallback>
		</Avatar>
	);
}
