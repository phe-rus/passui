import { Button } from "@passui/react/button";
import { Separator } from "@passui/react/separator";

export function SeparatorLabelled() {
	return (
		<div className="flex h-8 items-center gap-2">
			<Button variant="ghost" size="sm">
				Cut
			</Button>
			<Button variant="ghost" size="sm">
				Copy
			</Button>
			<Separator orientation="vertical" />
			<Button variant="ghost" size="sm">
				Paste
			</Button>
		</div>
	);
}
