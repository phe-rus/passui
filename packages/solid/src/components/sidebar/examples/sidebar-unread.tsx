import { createSignal } from "solid-js"
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
import { Button } from "@passui/solid/button"

export function SidebarUnread() {
    const [unread, setUnread] = createSignal(5)
    return (
        <div class="flex w-60 flex-col gap-4 rounded-4xl bg-sidebar p-3">
            <nav aria-label="Mail">
                <SidebarSection title="Mailboxes">
                    <a
                        href="#inbox"
                        aria-current="page"
                        class={sidebarItemClass(true)}
                    >
                        <SidebarItemContent
                            active
                            count={unread() || undefined}
                            icon={
                                <span aria-hidden="true">
                                    ✉
                                </span>
                            }
                        >
                            Inbox
                        </SidebarItemContent>
                    </a>
                    <a
                        href="#starred"
                        class={sidebarItemClass()}
                    >
                        <SidebarItemContent
                            icon={
                                <span aria-hidden="true">
                                    ☆
                                </span>
                            }
                        >
                            Starred
                        </SidebarItemContent>
                    </a>
                </SidebarSection>
            </nav>
            <Button
                variant="secondary"
                size="sm"
                disabled={unread() === 0}
                onClick={() => setUnread(0)}
            >
                Mark all as read
            </Button>
        </div>
    )
}
