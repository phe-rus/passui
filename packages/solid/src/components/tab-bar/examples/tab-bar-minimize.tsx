import { createSignal, For } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"
import {
    Home01Icon,
    LibraryIcon,
    UserIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function TabBarMinimize() {
    const [active, setActive] = createSignal("library")
    const tabs = [
        {
            id: "home",
            label: "Home",
            icon: <Hugeicon icon={Home01Icon} size={22} />,
        },
        {
            id: "library",
            label: "Library",
            icon: <Hugeicon icon={LibraryIcon} size={22} />,
        },
        {
            id: "profile",
            label: "Profile",
            icon: <Hugeicon icon={UserIcon} size={22} />,
        },
    ]
    return (
        <div class="relative h-96 w-full max-w-xs overflow-hidden rounded-5xl bg-background ring-1 ring-separator/60">
            <ul class="m-0 h-full list-none overflow-y-auto p-4 pb-24">
                <For
                    each={Array.from(
                        { length: 24 },
                        (_, index) => `Chapter ${index + 1}`
                    )}
                >
                    {(book) => (
                        <li class="border-separator/60 border-b py-3 text-subheadline text-label">
                            {book}
                        </li>
                    )}
                </For>
            </ul>
            <TabBar
                class="absolute inset-x-3 bottom-3"
                label="Main"
                active={active()}
                tabs={tabs}
                search={{
                    label: "Search",
                    onPress: () => {},
                }}
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
