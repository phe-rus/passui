import { BoldIcon } from "@passui/icons/bold";
import { ItalicIcon } from "@passui/icons/italic";
import { UnderlineIcon } from "@passui/icons/underline";
import { Button } from "@passui/react/button";
import { ButtonGroup } from "@passui/react/button-group";

export function ButtonGroupIcons() {
	return (
		<ButtonGroup aria-label="Formatting">
			<Button variant="outline" size="icon" aria-label="Bold">
				<BoldIcon />
			</Button>
			<Button variant="outline" size="icon" aria-label="Italic">
				<ItalicIcon />
			</Button>
			<Button variant="outline" size="icon" aria-label="Underline">
				<UnderlineIcon />
			</Button>
		</ButtonGroup>
	);
}
