import { Button } from "@passui/react/button";
import { Popover, PopoverContent, PopoverTrigger } from "@passui/react/popover";

const placements = ["top", "right", "bottom", "left"] as const;

/** The panel flips to the opposite side when there is no room. */
export function PopoverPlacement() {
	return (
		<div className="flex flex-wrap gap-3">
			{placements.map((placement) => (
				<Popover key={placement} placement={placement} offset={12}>
					<PopoverTrigger render={<Button variant="outline" size="sm" />}>
						{placement}
					</PopoverTrigger>
					<PopoverContent className="text-subheadline w-48 p-3">
						Opens to the {placement}.
					</PopoverContent>
				</Popover>
			))}
		</div>
	);
}
