import {
    FavouriteIcon,
    Home01Icon,
    LibraryIcon,
    UserIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { TabBar } from "@passui/react"
import { useState } from "react"

const tabs = [
    {
        id: "home",
        label: "Home",
        icon: <HugeiconsIcon icon={Home01Icon} size={22} />,
    },
    {
        id: "library",
        label: "Library",
        icon: <HugeiconsIcon icon={LibraryIcon} size={22} />,
    },
    {
        id: "saved",
        label: "Saved",
        icon: (
            <HugeiconsIcon icon={FavouriteIcon} size={22} />
        ),
    },
    {
        id: "profile",
        label: "Profile",
        icon: <HugeiconsIcon icon={UserIcon} size={22} />,
    },
]

const titles: Record<string, string> = {
    home: "Good morning, Aiko",
    library: "Your library",
    saved: "Saved for later",
    profile: "Your profile",
}

export function TabBarShowcase() {
    const [active, setActive] = useState("home")

    return (
        <div className="relative h-112 w-full max-w-xs overflow-hidden rounded-sheet bg-background shadow-sm ring-1 ring-separator/60">
            <div className="flex flex-col gap-4 p-6 pt-10">
                <h2 className="text-title2 font-bold text-label">
                    {titles[active]}
                </h2>
                {[0, 1, 2].map((row) => (
                    <div
                        key={row}
                        className="h-20 rounded-3xl bg-fill/60"
                    />
                ))}
            </div>
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
