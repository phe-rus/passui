import { InfoIcon } from "@passui/icons/info";
import { Alert, AlertTitle } from "@passui/react/alert";

export function AlertTitleOnly() {
	return (
		<Alert className="max-w-md">
			<InfoIcon />
			<AlertTitle>Your trial ends in three days</AlertTitle>
		</Alert>
	);
}
