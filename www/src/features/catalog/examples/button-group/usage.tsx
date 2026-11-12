import { Button } from "@passui/react/button";
import { ButtonGroup } from "@passui/react/button-group";

export function ButtonGroupUsage() {
	return (
		<ButtonGroup>
			<Button variant="outline">Day</Button>
			<Button variant="outline">Week</Button>
			<Button variant="outline">Month</Button>
		</ButtonGroup>
	);
}
