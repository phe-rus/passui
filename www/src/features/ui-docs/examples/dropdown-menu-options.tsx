import { Button } from "@passui/react/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@passui/react/dropdown-menu";
import { useState } from "react";

export function DropdownMenuOptions() {
	const [pinned, setPinned] = useState(true);
	const [sort, setSort] = useState("date");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				View
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuCheckboxItem
					checked={pinned}
					onCheckedChange={setPinned}
					closeOnSelect={false}
				>
					Show pinned
				</DropdownMenuCheckboxItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Sort by</DropdownMenuLabel>
				<DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
					<DropdownMenuRadioItem value="date">Date</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
