import { CheckIcon } from "@passui/icons/check";
import { Badge } from "@passui/react/badge";

export function BadgeWithIcon() {
	return (
		<Badge variant="success">
			<CheckIcon />
			Verified
		</Badge>
	);
}
