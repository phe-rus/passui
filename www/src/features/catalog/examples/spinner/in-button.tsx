import { Button } from "@passui/react/button";
import { Spinner } from "@passui/react/spinner";

export function SpinnerInButton() {
	return (
		<Button disabled>
			<Spinner />
			Saving
		</Button>
	);
}
