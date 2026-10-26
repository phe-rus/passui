import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"
export function TabBarUsage() {
    const [active, setActive] = createSignal("home")
    return (
        <div class="relative h-32 w-full max-w-sm overflow-hidden rounded-5xl bg-fill/40">
            <TabBar
                class="absolute inset-x-3 bottom-3"
                label="Main"
                active={active()}
                tabs={[
                    {
                        id: "home",
                        label: "Home",
                        icon: (
                            <span aria-hidden="true">⌂</span>
                        ),
                    },
                    {
                        id: "library",
                        label: "Library",
                        icon: (
                            <span aria-hidden="true">▤</span>
                        ),
                    },
                    {
                        id: "profile",
                        label: "Profile",
                        icon: (
                            <span aria-hidden="true">◉</span>
                        ),
                    },
                ]}
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
