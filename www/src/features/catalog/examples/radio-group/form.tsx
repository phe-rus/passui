import { Button } from "@passui/react/button";
import { RadioGroup, RadioGroupItem } from "@passui/react/radio-group";

export function RadioGroupForm() {
	return (
		<form
			className="flex flex-col items-start gap-3"
			onSubmit={(event) => {
				event.preventDefault();
				console.log(Object.fromEntries(new FormData(event.currentTarget)));
			}}
		>
			<RadioGroup name="size" defaultValue="m" aria-label="Size">
				<RadioGroupItem value="s">Small</RadioGroupItem>
				<RadioGroupItem value="m">Medium</RadioGroupItem>
				<RadioGroupItem value="l">Large</RadioGroupItem>
			</RadioGroup>
			<Button type="submit" size="sm">
				Order
			</Button>
		</form>
	);
}
