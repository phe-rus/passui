import { Button } from "@passui/react/button";
import { Popover } from "@passui/react/popover";
import { toast } from "@passui/react";

const actions = ["Duplicate", "Move to folder", "Export as PDF"];

export function PopoverMenu() {
	return (
		<Popover>
			<Popover.Trigger>
				<Button variant="secondary">More</Button>
			</Popover.Trigger>
			<Popover.Content
				origin="top-right"
				role="menu"
				label="More actions"
				className="flex w-56 flex-col p-1.5"
			>
				{actions.map((action) => (
					<Button
						key={action}
						type="button"
						role="menuitem"
						variant="ghost"
						size="sm"
						className="w-full justify-start"
						onClick={() => toast(action)}
					>
						{action}
					</Button>
				))}
			</Popover.Content>
		</Popover>
	);
}
