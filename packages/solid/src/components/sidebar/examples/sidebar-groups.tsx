import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"

export function SidebarGroups() {
    return (
        <nav
            aria-label="Workspace sections"
            class="grid w-full max-w-xs gap-5"
        >
            <SidebarSection title="Workspace">
                <a
                    href="#overview"
                    class={sidebarItemClass(true)}
                >
                    <SidebarItemContent
                        active
                        icon={
                            <span aria-hidden="true">⌂</span>
                        }
                    >
                        Overview
                    </SidebarItemContent>
                </a>
            </SidebarSection>
            <SidebarSection title="Resources">
                <a href="#files" class={sidebarItemClass()}>
                    <SidebarItemContent
                        icon={
                            <span aria-hidden="true">▤</span>
                        }
                    >
                        Files
                    </SidebarItemContent>
                </a>
                <a href="#people" class={sidebarItemClass()}>
                    <SidebarItemContent
                        icon={
                            <span aria-hidden="true">♧</span>
                        }
                    >
                        People
                    </SidebarItemContent>
                </a>
            </SidebarSection>
        </nav>
    )
}
