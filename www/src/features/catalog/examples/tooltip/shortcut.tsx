import { Button } from "@passui/react/button";
import { Kbd } from "@passui/react/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "@passui/react/tooltip";

export function TooltipShortcut() {
	return (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Save
			</TooltipTrigger>
			<TooltipContent>
				Save <Kbd>⌘S</Kbd>
			</TooltipContent>
		</Tooltip>
	);
}
