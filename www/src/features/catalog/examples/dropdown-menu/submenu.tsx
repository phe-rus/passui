import { Button } from "@passui/react/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@passui/react/dropdown-menu";

export function DropdownMenuSubmenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Share
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Copy link</DropdownMenuItem>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Send to</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>Mail</DropdownMenuItem>
						<DropdownMenuItem>Messages</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
