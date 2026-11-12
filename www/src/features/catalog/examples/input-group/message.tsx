import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupText,
	InputGroupTextarea,
} from "@passui/react/input-group";
import { useState } from "react";

export function InputGroupMessage() {
	const [value, setValue] = useState("");
	return (
		<InputGroup className="max-w-sm">
			<InputGroupAddon align="block-start">
				<InputGroupText>Message</InputGroupText>
			</InputGroupAddon>
			<InputGroupTextarea
				aria-label="Message"
				placeholder="Write something"
				value={value}
				onChange={(event) => setValue(event.target.value)}
			/>
			<InputGroupAddon align="block-end">
				<InputGroupText>{value.length} / 280</InputGroupText>
				<InputGroupButton variant="default" disabled={!value}>
					Send
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
