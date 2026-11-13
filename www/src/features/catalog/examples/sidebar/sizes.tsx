import { HomeIcon } from "@passui/icons/home";
import {
	Sidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@passui/react/sidebar";

export function SidebarSizes() {
	return (
		<div className="flex flex-wrap gap-6">
			{(["sm", "md", "lg"] as const).map((size) => (
				<Sidebar key={size} aria-label={`Size ${size}`} className="w-44">
					<SidebarGroup>
						<SidebarGroupLabel size={size}>{size}</SidebarGroupLabel>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									size={size}
									href="#a"
									isActive
									icon={<HomeIcon size={16} />}
									badge={3}
								>
									Home
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton size={size} href="#b">
									Projects
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroup>
				</Sidebar>
			))}
		</div>
	);
}
