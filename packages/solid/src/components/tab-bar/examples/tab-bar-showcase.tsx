import { createSignal, For } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"

const tabs = [
    {
        id: "home",
        label: "Home",
        icon: <span aria-hidden="true">⌂</span>,
    },
    {
        id: "library",
        label: "Library",
        icon: <span aria-hidden="true">▤</span>,
    },
    {
        id: "saved",
        label: "Saved",
        icon: <span aria-hidden="true">☆</span>,
    },
    {
        id: "profile",
        label: "Profile",
        icon: <span aria-hidden="true">◉</span>,
    },
]
const titles: Record<string, string> = {
    home: "Good morning, Aiko",
    library: "Your library",
    saved: "Saved for later",
    profile: "Your profile",
}

export function TabBarShowcase() {
    const [active, setActive] = createSignal("home")
    return (
        <div class="relative h-112 w-full max-w-xs overflow-hidden rounded-sheet bg-background shadow-sm ring-1 ring-separator/60">
            <div class="flex flex-col gap-4 p-6 pt-10">
                <h2 class="text-title2 font-bold text-label">
                    {titles[active()]}
                </h2>
                <For each={[0, 1, 2]}>
                    {() => (
                        <div class="h-20 rounded-3xl bg-fill/60" />
                    )}
                </For>
            </div>
            <TabBar
                label="Main"
                tabs={tabs}
                active={active()}
                search={{
                    label: "Search",
                    onPress: () => {},
                }}
                class="absolute inset-x-3 bottom-3"
                renderLink={(tab, link) => (
                    <a
                        href={`#${tab.id}`}
                        class={link.className}
                        aria-current={link["aria-current"]}
                        onClick={(event) => {
                            event.preventDefault()
                            setActive(tab.id)
                        }}
                    >
                        {link.children}
                    </a>
                )}
            />
        </div>
    )
}
