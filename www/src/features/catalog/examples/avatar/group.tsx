import { Avatar, AvatarFallback } from "@passui/react/avatar";

export function AvatarGroup() {
	return (
		<div className="flex -space-x-2">
			{["MI", "KE", "AI", "+3"].map((initials) => (
				<Avatar key={initials} className="ring-background ring-2">
					<AvatarFallback>{initials}</AvatarFallback>
				</Avatar>
			))}
		</div>
	);
}
