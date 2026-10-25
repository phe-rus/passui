import {
    Archive01Icon,
    Calendar03Icon,
    Delete02Icon,
    Folder01Icon,
    InboxIcon,
    Note01Icon,
} from "@hugeicons/core-free-icons"
import {
    HugeiconsIcon,
    type IconSvgElement,
} from "@hugeicons/react"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"
import { useState } from "react"

type Row = {
    id: string
    label: string
    icon: IconSvgElement
    count?: number
}

const sections: { title: string; items: Row[] }[] = [
    {
        title: "Library",
        items: [
            {
                id: "notes",
                label: "All notes",
                icon: Note01Icon,
                count: 248,
            },
            {
                id: "today",
                label: "Today",
                icon: Calendar03Icon,
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
                icon: Folder01Icon,
                count: 61,
            },
            {
                id: "travel",
                label: "Travel",
                icon: Folder01Icon,
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
                icon: Archive01Icon,
            },
            {
                id: "trash",
                label: "Recently deleted",
                icon: Delete02Icon,
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
                                icon={
                                    <HugeiconsIcon
                                        icon={item.icon}
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
    )
}
