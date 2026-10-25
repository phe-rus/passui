import {
    Home01Icon,
    Settings01Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"

export function SidebarUsage() {
    // Use your router's link in place of <a>, passing it the class.
    return (
        <nav aria-label="Main" className="w-56">
            <SidebarSection title="Workspace">
                <a
                    href="#home"
                    aria-current="page"
                    className={sidebarItemClass(true)}
                >
                    <SidebarItemContent
                        active
                        icon={
                            <HugeiconsIcon
                                icon={Home01Icon}
                                size={18}
                            />
                        }
                    >
                        Home
                    </SidebarItemContent>
                </a>
                <a
                    href="#settings"
                    className={sidebarItemClass()}
                >
                    <SidebarItemContent
                        icon={
                            <HugeiconsIcon
                                icon={Settings01Icon}
                                size={18}
                            />
                        }
                    >
                        Settings
                    </SidebarItemContent>
                </a>
            </SidebarSection>
        </nav>
    )
}
