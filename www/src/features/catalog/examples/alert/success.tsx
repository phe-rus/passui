import { CheckIcon } from "@passui/icons/check";
import { Alert, AlertDescription, AlertTitle } from "@passui/react/alert";

export function AlertSuccess() {
	return (
		<Alert className="max-w-md">
			<CheckIcon />
			<AlertTitle>Changes saved</AlertTitle>
			<AlertDescription>Everything is up to date.</AlertDescription>
		</Alert>
	);
}
