import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"
import {
    Calendar03Icon,
    Home01Icon,
    InboxIcon,
    LibraryIcon,
    UserIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function TabBarFiveTabs() {
    const [active, setActive] = createSignal("inbox")
    const tabs = [
        {
            id: "home",
            label: "Home",
            icon: <Hugeicon icon={Home01Icon} size={22} />,
        },
        {
            id: "inbox",
            label: "Inbox",
            icon: <Hugeicon icon={InboxIcon} size={22} />,
        },
        {
            id: "calendar",
            label: "Calendar",
            icon: (
                <Hugeicon icon={Calendar03Icon} size={22} />
            ),
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
        <div class="relative h-32 w-full max-w-sm overflow-hidden rounded-5xl bg-fill/40">
            <TabBar
                class="absolute inset-x-3 bottom-3"
                label="Main"
                active={active()}
                tabs={tabs}
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
