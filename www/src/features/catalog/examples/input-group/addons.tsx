import { Input } from "@passui/react/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "@passui/react/input-group";

export function InputGroupAddons() {
	return (
		<div className="flex w-full max-w-sm flex-col gap-3">
			<InputGroup>
				<InputGroupAddon>
					<InputGroupText>https://</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput aria-label="Domain" placeholder="example" />
				<InputGroupAddon align="end">
					<InputGroupText>.com</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupAddon>
					<InputGroupText>$</InputGroupText>
				</InputGroupAddon>
				<InputGroupInput
					aria-label="Amount"
					inputMode="decimal"
					placeholder="0.00"
				/>
				<InputGroupAddon align="end">
					<InputGroupText>USD</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<Input aria-label="For comparison" placeholder="A plain input" />
		</div>
	);
}
