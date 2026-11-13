import { Button } from "@passui/react/button";
import { ButtonGroup } from "@passui/react/button-group";

export function ButtonGroupSizes() {
	return (
		<div className="flex flex-col items-start gap-3">
			{(["xs", "sm", "default", "lg"] as const).map((size) => (
				<ButtonGroup key={size}>
					<Button variant="secondary" size={size}>
						Back
					</Button>
					<Button variant="secondary" size={size}>
						Forward
					</Button>
				</ButtonGroup>
			))}
		</div>
	);
}
