import { createSignal, For } from "solid-js"
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
import {
    Archive01Icon,
    Calendar03Icon,
    Delete02Icon,
    Folder01Icon,
    InboxIcon,
    Note01Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function SidebarGroups() {
    const [active, setActive] = createSignal("today")
    const sections = [
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
                    count: undefined,
                },
                {
                    id: "trash",
                    label: "Recently deleted",
                    icon: Delete02Icon,
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
                                            <Hugeicon
                                                icon={
                                                    item.icon
                                                }
                                                size={18}
                                            />
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
