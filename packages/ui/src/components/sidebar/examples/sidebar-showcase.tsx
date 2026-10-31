import {
    ChartIcon,
    FolderIcon,
    HomeIcon,
    PersonIcon,
    SettingsIcon,
} from "@passui/react/icons"

import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"
import { useState } from "react"

const sections = [
    {
        title: "Console",
        items: [
            {
                id: "overview",
                label: "Overview",
                icon: HomeIcon,
            },
            {
                id: "apps",
                label: "Applications",
                icon: FolderIcon,
                count: 6,
            },
            {
                id: "users",
                label: "Users",
                icon: PersonIcon,
                count: 1284,
            },
            {
                id: "activity",
                label: "Activity",
                icon: ChartIcon,
            },
        ],
    },
    {
        title: "Project",
        items: [
            {
                id: "settings",
                label: "Settings",
                icon: SettingsIcon,
            },
        ],
    },
]

const titles: Record<string, string> = {
    overview: "Overview",
    apps: "Applications",
    users: "Users",
    activity: "Activity",
    settings: "Settings",
}

export function SidebarShowcase() {
    const [active, setActive] = useState("users")

    return (
        <div className="flex h-80 w-full max-w-2xl overflow-hidden rounded-5xl bg-background shadow-sm ring-1 ring-separator/60">
            <nav
                aria-label="Console"
                className="glass-pane flex w-56 shrink-0 flex-col gap-5 p-3 max-sm:hidden"
            >
                {sections.map((section) => (
                    <SidebarSection
                        key={section.title}
                        title={section.title}
                    >
                        {section.items.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                aria-current={
                                    item.id === active
                                        ? "page"
                                        : undefined
                                }
                                className={sidebarItemClass(
                                    item.id === active
                                )}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setActive(item.id)
                                }}
                            >
                                <SidebarItemContent
                                    active={
                                        item.id === active
                                    }
                                    count={item.count}
                                    icon={
                                        <item.icon
                                            size={18}
                                        />
                                    }
                                >
                                    {item.label}
                                </SidebarItemContent>
                            </a>
                        ))}
                    </SidebarSection>
                ))}
            </nav>
            <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-title3 font-bold text-label">
                    {titles[active]}
                </h2>
                <div className="h-16 rounded-3xl bg-fill/60" />
                <div className="h-16 rounded-3xl bg-fill/60" />
            </div>
        </div>
    )
}
