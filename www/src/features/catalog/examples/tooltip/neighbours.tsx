import { Button } from "@passui/react/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@passui/react/tooltip";

const tools = ["Bold", "Italic", "Underline"];

/** Move across the row: after the first tip opens, the others open at once. */
export function TooltipNeighbours() {
	return (
		<div className="flex gap-2">
			{tools.map((tool) => (
				<Tooltip key={tool} placement="bottom" openDelay={500} closeDelay={100}>
					<TooltipTrigger render={<Button variant="secondary" size="sm" />}>
						{tool[0]}
					</TooltipTrigger>
					<TooltipContent>{tool}</TooltipContent>
				</Tooltip>
			))}
		</div>
	);
}
