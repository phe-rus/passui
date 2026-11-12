import { WarningIcon } from "@passui/icons/warning";
import { Alert, AlertDescription, AlertTitle } from "@passui/react/alert";

export function AlertDestructive() {
	return (
		<Alert variant="destructive" className="max-w-md">
			<WarningIcon />
			<AlertTitle>Payment failed</AlertTitle>
			<AlertDescription>
				Check your card details and try again.
			</AlertDescription>
		</Alert>
	);
}
