import { SearchIcon } from "@passui/icons/search";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@passui/react/input-group";

export function InputGroupUsage() {
	return (
		<InputGroup className="max-w-sm">
			<InputGroupAddon>
				<SearchIcon size={18} />
			</InputGroupAddon>
			<InputGroupInput placeholder="Search" aria-label="Search" />
		</InputGroup>
	);
}
