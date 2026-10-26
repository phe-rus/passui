/** @jsxImportSource solid-js */
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
export function SidebarUsage() {
    return (
        <SidebarSection title="Workspace">
            <a
                href="#overview"
                class={sidebarItemClass(true)}
            >
                <SidebarItemContent
                    icon={<span aria-hidden="true">⌂</span>}
                    active
                    count={3}
                >
                    Overview
                </SidebarItemContent>
            </a>
        </SidebarSection>
    )
}
