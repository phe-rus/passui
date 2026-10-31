import {
    HomeIcon,
    LibraryIcon,
    PersonIcon,
} from "@passui/react/icons"

import { TabBar } from "@passui/react"
import { useState } from "react"

const tabs = [
    {
        id: "home",
        label: "Home",
        icon: <HomeIcon size={22} />,
    },
    {
        id: "library",
        label: "Library",
        icon: <LibraryIcon size={22} />,
    },
    {
        id: "profile",
        label: "Profile",
        icon: <PersonIcon size={22} />,
    },
]

export function TabBarUsage() {
    const [active, setActive] = useState("home")

    // In an app the bar is fixed to the bottom of the screen; here it
    // sits in a frame so the example stays on the page.
    return (
        <div className="relative h-32 w-full max-w-sm overflow-hidden rounded-5xl bg-fill/40">
            <TabBar
                label="Main"
                tabs={tabs}
                active={active}
                className="absolute inset-x-3 bottom-3"
                renderLink={(tab, props) => (
                    <a
                        key={tab.id}
                        href={`#${tab.id}`}
                        {...props}
                        onClick={(event) => {
                            event.preventDefault()
                            setActive(tab.id)
                        }}
                    />
                )}
            />
        </div>
    )
}
