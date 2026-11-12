import { Button } from "@passui/react/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@passui/react/tooltip";

export function TooltipUsage() {
	return (
		<Tooltip>
			<TooltipTrigger render={<Button variant="outline" />}>
				Hover me
			</TooltipTrigger>
			<TooltipContent>Saved a moment ago</TooltipContent>
		</Tooltip>
	);
}
