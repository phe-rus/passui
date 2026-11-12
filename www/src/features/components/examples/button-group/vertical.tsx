import { Button } from "@passui/react/button";
import { ButtonGroup } from "@passui/react/button-group";

export function ButtonGroupVertical() {
	return (
		<ButtonGroup orientation="vertical">
			<Button variant="secondary">Copy</Button>
			<Button variant="secondary">Paste</Button>
		</ButtonGroup>
	);
}
