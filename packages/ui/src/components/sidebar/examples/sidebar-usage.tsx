import { HomeIcon, SettingsIcon } from "@passui/react/icons"

import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"

export function SidebarUsage() {
    // Use your router's link in place of <a>, passing it the class.
    return (
        <nav aria-label="Main" className="w-56">
            <SidebarSection title="Workspace">
                <a
                    href="#home"
                    aria-current="page"
                    className={sidebarItemClass(true)}
                >
                    <SidebarItemContent
                        active
                        icon={<HomeIcon size={18} />}
                    >
                        Home
                    </SidebarItemContent>
                </a>
                <a
                    href="#settings"
                    className={sidebarItemClass()}
                >
                    <SidebarItemContent
                        icon={<SettingsIcon size={18} />}
                    >
                        Settings
                    </SidebarItemContent>
                </a>
            </SidebarSection>
        </nav>
    )
}
