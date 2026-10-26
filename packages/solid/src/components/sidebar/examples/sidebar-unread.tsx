import { createSignal } from "solid-js"
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"

export function SidebarUnread() {
    const [unread, setUnread] = createSignal(5)
    return (
        <nav
            aria-label="Inbox folders"
            class="w-full max-w-xs"
        >
            <SidebarSection title="Messages">
                <button
                    type="button"
                    class={sidebarItemClass(true)}
                    onClick={() => setUnread(0)}
                >
                    <SidebarItemContent
                        icon={
                            <span aria-hidden="true">✉</span>
                        }
                        active
                        count={unread()}
                    >
                        Inbox
                    </SidebarItemContent>
                </button>
                <div class={sidebarItemClass()}>
                    <SidebarItemContent
                        icon={
                            <span aria-hidden="true">☆</span>
                        }
                    >
                        Starred
                    </SidebarItemContent>
                </div>
            </SidebarSection>
        </nav>
    )
}
