import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
import {
    Home01Icon,
    Settings02Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"
export function SidebarUsage() {
    return (
        <nav aria-label="Main" class="w-56">
            <SidebarSection title="Workspace">
                <a
                    href="#home"
                    aria-current="page"
                    class={sidebarItemClass(true)}
                >
                    <SidebarItemContent
                        active
                        icon={
                            <Hugeicon
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
                    class={sidebarItemClass()}
                >
                    <SidebarItemContent
                        icon={
                            <Hugeicon
                                icon={Settings02Icon}
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
