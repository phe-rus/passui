import { Checkbox } from "@passui/react/checkbox";

export function CheckboxDisabled() {
	return (
		<div className="flex flex-col gap-3">
			<Checkbox disabled>Not available</Checkbox>
			<Checkbox disabled defaultChecked>
				Required by your plan
			</Checkbox>
		</div>
	);
}
