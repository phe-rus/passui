import { createSignal, For } from "solid-js"
import {
    Analytics01Icon,
    Folder01Icon,
    Home01Icon,
    Settings01Icon,
    UserIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/solid/sidebar"

const sections = [
    {
        title: "Console",
        items: [
            {
                id: "overview",
                label: "Overview",
                icon: Home01Icon,
                count: undefined,
            },
            {
                id: "apps",
                label: "Applications",
                icon: Folder01Icon,
                count: 6,
            },
            {
                id: "users",
                label: "Users",
                icon: UserIcon,
                count: 1284,
            },
            {
                id: "activity",
                label: "Activity",
                icon: Analytics01Icon,
                count: undefined,
            },
        ],
    },
    {
        title: "Project",
        items: [
            {
                id: "settings",
                label: "Settings",
                icon: Settings01Icon,
                count: undefined,
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
    const [active, setActive] = createSignal("users")
    return (
        <div class="flex h-80 w-full max-w-2xl overflow-hidden rounded-5xl bg-background shadow-sm ring-1 ring-separator/60">
            <nav
                aria-label="Console"
                class="glass-pane flex w-56 shrink-0 flex-col gap-5 p-3 max-sm:hidden"
            >
                <For each={sections}>
                    {(section) => (
                        <SidebarSection title={section.title}>
                            <For each={section.items}>
                                {(item) => (
                                    <a
                                        href={`#${item.id}`}
                                        aria-current={
                                            item.id ===
                                            active()
                                                ? "page"
                                                : undefined
                                        }
                                        class={sidebarItemClass(
                                            item.id ===
                                                active()
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
            <div class="flex flex-1 flex-col gap-3 p-6">
                <h2 class="text-title3 font-bold text-label">
                    {titles[active()]}
                </h2>
                <div class="h-16 rounded-3xl bg-fill/60" />
                <div class="h-16 rounded-3xl bg-fill/60" />
            </div>
        </div>
    )
}
