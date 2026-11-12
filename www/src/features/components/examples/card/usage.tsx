import { Button } from "@passui/react/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@passui/react/card";

export function CardUsage() {
	return (
		<Card className="w-full max-w-sm">
			<CardHeader>
				<CardTitle>Team plan</CardTitle>
				<CardDescription>Up to ten people.</CardDescription>
			</CardHeader>
			<CardContent>Shared libraries, roles and audit history.</CardContent>
			<CardFooter>
				<Button size="sm">Upgrade</Button>
			</CardFooter>
		</Card>
	);
}
