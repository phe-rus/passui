import { SearchIcon } from "@passui/icons/search";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@passui/react/input-group";
import { useState } from "react";

export function InputGroupButtons() {
	const [copied, setCopied] = useState(false);
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<InputGroup>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupInput aria-label="Search" placeholder="Search docs" />
				<InputGroupAddon align="end">
					<InputGroupButton variant="secondary">Search</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput
					aria-label="Invite link"
					readOnly
					defaultValue="passui.pherus.org/invite/4f2a"
				/>
				<InputGroupAddon align="end">
					<InputGroupButton onClick={() => setCopied(true)}>
						{copied ? "Copied" : "Copy"}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
		</div>
	);
}
