import { Badge } from "@passui/react/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@passui/react/card";

export function CardWithAction() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Backups</CardTitle>
				<CardAction>
					<Badge variant="success">On</Badge>
				</CardAction>
			</CardHeader>
		</Card>
	);
}
