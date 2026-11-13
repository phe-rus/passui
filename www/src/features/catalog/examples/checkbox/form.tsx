import { Button } from "@passui/react/button";
import { Checkbox } from "@passui/react/checkbox";

export function CheckboxForm() {
	return (
		<form
			className="flex flex-col items-start gap-3"
			onSubmit={(event) => {
				event.preventDefault();
				const data = new FormData(event.currentTarget);
				console.log(Object.fromEntries(data));
			}}
		>
			<Checkbox name="news" value="yes">
				Send me product news
			</Checkbox>
			<Button type="submit" size="sm">
				Subscribe
			</Button>
		</form>
	);
}
