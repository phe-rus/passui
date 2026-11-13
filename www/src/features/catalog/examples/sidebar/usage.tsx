import { HomeIcon } from "@passui/icons/home";
import { SettingsIcon } from "@passui/icons/settings";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@passui/react/sidebar";

export function SidebarUsage() {
	return (
		<Sidebar aria-label="Main" className="w-56">
			<SidebarGroup>
				<SidebarGroupLabel>Workspace</SidebarGroupLabel>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							href="#home"
							isActive
							icon={<HomeIcon size={18} />}
						>
							Home
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							href="#settings"
							icon={<SettingsIcon size={18} />}
						>
							Settings
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarGroup>
		</Sidebar>
	);
}
