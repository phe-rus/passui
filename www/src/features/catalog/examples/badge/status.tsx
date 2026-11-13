import { Badge } from "@passui/react/badge";

export function BadgeStatus() {
	return (
		<div className="flex flex-wrap gap-2">
			<Badge variant="success">Live</Badge>
			<Badge variant="warning">Review</Badge>
			<Badge variant="destructive">Failed</Badge>
			<Badge variant="outline">Draft</Badge>
		</div>
	);
}
