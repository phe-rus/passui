import { Avatar, AvatarFallback, AvatarImage } from "@passui/react/avatar";

export function AvatarBrokenImage() {
	return (
		<Avatar>
			<AvatarImage src="/avatars/does-not-exist.svg" alt="Unknown" />
			<AvatarFallback>?</AvatarFallback>
		</Avatar>
	);
}
