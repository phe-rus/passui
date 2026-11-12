import { InfoIcon } from "@passui/icons/info";
import { Alert, AlertDescription, AlertTitle } from "@passui/react/alert";

export function AlertUsage() {
	return (
		<Alert className="max-w-md">
			<InfoIcon />
			<AlertTitle>Heads up</AlertTitle>
			<AlertDescription>
				Your plan renews on the first of the month.
			</AlertDescription>
		</Alert>
	);
}
