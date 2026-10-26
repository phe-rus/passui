import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"

export function TabBarFiveTabs() {
    const [active, setActive] = createSignal("home")
    const tabs = [
        {
            id: "home",
            label: "Home",
            icon: <span aria-hidden="true">⌂</span>,
        },
        {
            id: "search",
            label: "Search",
            icon: <span aria-hidden="true">⌕</span>,
        },
        {
            id: "saved",
            label: "Saved",
            icon: <span aria-hidden="true">☆</span>,
        },
        {
            id: "inbox",
            label: "Inbox",
            icon: <span aria-hidden="true">✉</span>,
        },
        {
            id: "profile",
            label: "Profile",
            icon: <span aria-hidden="true">◉</span>,
        },
    ]
    return (
        <div class="relative min-h-36 w-full">
            <TabBar
                class="relative inset-auto"
                label="Main navigation"
                active={active()}
                tabs={tabs}
                minimizeBehavior="never"
                renderLink={(tab, link) => (
                    <button
                        type="button"
                        class={link.className}
                        aria-current={link["aria-current"]}
                        onClick={() => setActive(tab.id)}
                    >
                        {link.children}
                    </button>
                )}
            />
        </div>
    )
}
