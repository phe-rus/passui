import { PlusIcon } from "@passui/icons/plus";
import { Button } from "@passui/react/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@passui/react/tooltip";

export function TooltipIconButton() {
	return (
		<Tooltip>
			<TooltipTrigger
				render={<Button size="icon" variant="outline" aria-label="New note" />}
			>
				<PlusIcon />
			</TooltipTrigger>
			<TooltipContent>New note</TooltipContent>
		</Tooltip>
	);
}
