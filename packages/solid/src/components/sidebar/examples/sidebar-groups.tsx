import { createSignal, For } from "solid-js"
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"

export function SidebarGroups() {
    const [active, setActive] = createSignal("today")
    const sections = [
        {
            title: "Library",
            items: [
                {
                    id: "notes",
                    label: "All notes",
                    icon: "▤",
                    count: 248,
                },
                {
                    id: "today",
                    label: "Today",
                    icon: "▦",
                    count: 4,
                },
                {
                    id: "inbox",
                    label: "Inbox",
                    icon: "✉",
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
                    icon: "▱",
                    count: 61,
                },
                {
                    id: "travel",
                    label: "Travel",
                    icon: "▱",
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
                    icon: "▥",
                    count: undefined,
                },
                {
                    id: "trash",
                    label: "Recently deleted",
                    icon: "♲",
                    count: undefined,
                },
            ],
        },
    ]
    return (
        <nav
            aria-label="Notes"
            class="flex w-60 flex-col gap-5 rounded-4xl bg-sidebar p-3"
        >
            <For each={sections}>
                {(section) => (
                    <SidebarSection title={section.title}>
                        <For each={section.items}>
                            {(item) => (
                                <a
                                    href={`#${item.id}`}
                                    aria-current={
                                        item.id === active()
                                            ? "page"
                                            : undefined
                                    }
                                    class={sidebarItemClass(
                                        item.id === active()
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        setActive(item.id)
                                    }}
                                >
                                    <SidebarItemContent
                                        active={
                                            item.id ===
                                            active()
                                        }
                                        count={item.count}
                                        icon={
                                            <span aria-hidden="true">
                                                {item.icon}
                                            </span>
                                        }
                                    >
                                        {item.label}
                                    </SidebarItemContent>
                                </a>
                            )}
                        </For>
                    </SidebarSection>
                )}
            </For>
        </nav>
    )
}
