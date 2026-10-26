import { createSignal } from "solid-js"
import { TabBar } from "@passui/solid/tab-bar"
import {
    Home01Icon,
    LibraryIcon,
    UserIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"
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
                            <Hugeicon
                                icon={Home01Icon}
                                size={22}
                            />
                        ),
                    },
                    {
                        id: "library",
                        label: "Library",
                        icon: (
                            <Hugeicon
                                icon={LibraryIcon}
                                size={22}
                            />
                        ),
                    },
                    {
                        id: "profile",
                        label: "Profile",
                        icon: (
                            <Hugeicon
                                icon={UserIcon}
                                size={22}
                            />
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
