import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
export function SidebarUsage() {
    return (
        <nav aria-label="Main" class="w-56">
            <SidebarSection title="Workspace">
                <a
                    href="#home"
                    aria-current="page"
                    class={sidebarItemClass(true)}
                >
                    <SidebarItemContent
                        active
                        icon={
                            <span aria-hidden="true">⌂</span>
                        }
                    >
                        Home
                    </SidebarItemContent>
                </a>
                <a
                    href="#settings"
                    class={sidebarItemClass()}
                >
                    <SidebarItemContent
                        icon={
                            <span aria-hidden="true">⚙</span>
                        }
                    >
                        Settings
                    </SidebarItemContent>
                </a>
            </SidebarSection>
        </nav>
    )
}
