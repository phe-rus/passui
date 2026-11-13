import { InboxIcon } from "@passui/icons/inbox";
import { StarIcon } from "@passui/icons/star";
import { Button } from "@passui/react/button";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@passui/react/sidebar";
import { useState } from "react";

export function SidebarUnread() {
	const [unread, setUnread] = useState(5);

	return (
		<div className="bg-sidebar flex w-60 flex-col gap-4 rounded-4xl p-3">
			<Sidebar aria-label="Mail">
				<SidebarGroup>
					<SidebarGroupLabel>Mailboxes</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								href="#inbox"
								isActive
								icon={<InboxIcon size={18} />}
								badge={unread || undefined}
							>
								Inbox
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton href="#starred" icon={<StarIcon size={18} />}>
								Starred
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</Sidebar>
			<Button
				variant="secondary"
				size="sm"
				disabled={unread === 0}
				onClick={() => setUnread(0)}
			>
				Mark all as read
			</Button>
		</div>
	);
}
