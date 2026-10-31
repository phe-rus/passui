import {
    ArchiveIcon,
    CalendarIcon,
    FolderIcon,
    InboxIcon,
    NoteIcon,
    TrashIcon,
    type IconProps,
} from "@passui/react/icons"
import type { ComponentType } from "react"

import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"
import { useState } from "react"

type Row = {
    id: string
    label: string
    icon: ComponentType<IconProps>
    count?: number
}

const sections: { title: string; items: Row[] }[] = [
    {
        title: "Library",
        items: [
            {
                id: "notes",
                label: "All notes",
                icon: NoteIcon,
                count: 248,
            },
            {
                id: "today",
                label: "Today",
                icon: CalendarIcon,
                count: 4,
            },
            {
                id: "inbox",
                label: "Inbox",
                icon: InboxIcon,
                count: 9,
            },
        ],
    },
    {
        title: "Folders",
        items: [
            {
                id: "work",
                label: "Work",
                icon: FolderIcon,
                count: 61,
            },
            {
                id: "travel",
                label: "Travel",
                icon: FolderIcon,
                count: 17,
            },
        ],
    },
    {
        title: "More",
        items: [
            {
                id: "archive",
                label: "Archive",
                icon: ArchiveIcon,
            },
            {
                id: "trash",
                label: "Recently deleted",
                icon: TrashIcon,
            },
        ],
    },
]

export function SidebarGroups() {
    const [active, setActive] = useState("today")

    return (
        <nav
            aria-label="Notes"
            className="flex w-60 flex-col gap-5 rounded-4xl bg-sidebar p-3"
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
                                active={item.id === active}
                                count={item.count}
                                icon={<item.icon size={18} />}
                            >
                                {item.label}
                            </SidebarItemContent>
                        </a>
                    ))}
                </SidebarSection>
            ))}
        </nav>
    )
}
