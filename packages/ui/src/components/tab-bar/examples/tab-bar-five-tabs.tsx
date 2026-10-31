import {
    CalendarIcon,
    HomeIcon,
    InboxIcon,
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
        id: "inbox",
        label: "Inbox",
        icon: <InboxIcon size={22} />,
    },
    {
        id: "calendar",
        label: "Calendar",
        icon: <CalendarIcon size={22} />,
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

export function TabBarFiveTabs() {
    const [active, setActive] = useState("inbox")

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
