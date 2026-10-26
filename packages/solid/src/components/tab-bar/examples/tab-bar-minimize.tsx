import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"

export function TabBarMinimize() {
    const [active, setActive] = createSignal("home")
    const [minimized, setMinimized] = createSignal(false)
    const tabs = [
        {
            id: "home",
            label: "Home",
            icon: <span aria-hidden="true">⌂</span>,
        },
        {
            id: "saved",
            label: "Saved",
            icon: <span aria-hidden="true">☆</span>,
        },
    ]
    return (
        <div class="grid w-full gap-3">
            <label class="flex items-center gap-2 text-footnote">
                <input
                    type="checkbox"
                    checked={minimized()}
                    onChange={(event) =>
                        setMinimized(
                            event.currentTarget.checked
                        )
                    }
                />{" "}
                Minimize on scroll
            </label>
            <div class="relative min-h-32">
                <TabBar
                    class="relative inset-auto"
                    label="Main navigation"
                    active={active()}
                    tabs={tabs}
                    minimizeBehavior={
                        minimized() ? "scroll" : "never"
                    }
                    renderLink={(tab, link) => (
                        <button
                            type="button"
                            class={link.className}
                            aria-current={
                                link["aria-current"]
                            }
                            onClick={() => setActive(tab.id)}
                        >
                            {link.children}
                        </button>
                    )}
                />
            </div>
        </div>
    )
}
