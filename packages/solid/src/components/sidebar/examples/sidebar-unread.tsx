import { createSignal } from "solid-js"
import {
    SidebarSection,
    SidebarItemContent,
    sidebarItemClass,
} from "@passui/solid/sidebar"
import { Button } from "@passui/solid/button"
import {
    Mail01Icon,
    StarIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

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
                                <Hugeicon
                                    icon={Mail01Icon}
                                    size={18}
                                />
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
                                <Hugeicon
                                    icon={StarIcon}
                                    size={18}
                                />
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
