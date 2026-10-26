import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"
export function TabBarUsage() {
    const [active, setActive] = createSignal("home")
    return (
        <div class="relative min-h-32 w-full">
            <TabBar
                class="relative inset-auto"
                label="Main navigation"
                active={active()}
                minimizeBehavior="never"
                tabs={[
                    {
                        id: "home",
                        label: "Home",
                        icon: (
                            <span aria-hidden="true">⌂</span>
                        ),
                    },
                    {
                        id: "saved",
                        label: "Saved",
                        icon: (
                            <span aria-hidden="true">☆</span>
                        ),
                    },
                ]}
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
