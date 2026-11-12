import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@passui/react/input-group";

export function InputGroupTrailing() {
	return (
		<InputGroup className="max-w-sm">
			<InputGroupInput placeholder="username" aria-label="Username" />
			<InputGroupAddon align="end">@pherus.org</InputGroupAddon>
		</InputGroup>
	);
}
