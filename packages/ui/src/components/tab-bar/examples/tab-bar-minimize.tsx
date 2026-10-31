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

const books = Array.from(
    { length: 24 },
    (_, index) => `Chapter ${index + 1}`
)

export function TabBarMinimize() {
    const [active, setActive] = useState("library")

    return (
        <div className="relative h-96 w-full max-w-xs overflow-hidden rounded-5xl bg-background ring-1 ring-separator/60">
            <ul className="m-0 h-full list-none overflow-y-auto p-4 pb-24">
                {books.map((book) => (
                    <li
                        key={book}
                        className="border-separator/60 border-b py-3 text-subheadline text-label"
                    >
                        {book}
                    </li>
                ))}
            </ul>
            <TabBar
                label="Main"
                tabs={tabs}
                active={active}
                search={{
                    label: "Search",
                    onPress: () => {},
                }}
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
