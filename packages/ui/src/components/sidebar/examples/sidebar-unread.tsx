import { InboxIcon, StarIcon } from "@passui/react/icons"

import { Button } from "@passui/react/button"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "@passui/react/sidebar"
import { useState } from "react"

export function SidebarUnread() {
    const [unread, setUnread] = useState(5)

    return (
        <div className="flex w-60 flex-col gap-4 rounded-4xl bg-sidebar p-3">
            <nav aria-label="Mail">
                <SidebarSection title="Mailboxes">
                    <a
                        href="#inbox"
                        aria-current="page"
                        className={sidebarItemClass(true)}
                    >
                        <SidebarItemContent
                            active
                            count={unread || undefined}
                            icon={<InboxIcon size={18} />}
                        >
                            Inbox
                        </SidebarItemContent>
                    </a>
                    <a
                        href="#starred"
                        className={sidebarItemClass()}
                    >
                        <SidebarItemContent
                            icon={<StarIcon size={18} />}
                        >
                            Starred
                        </SidebarItemContent>
                    </a>
                </SidebarSection>
            </nav>
            <Button
                variant="secondary"
                size="sm"
                disabled={unread === 0}
                onClick={() => setUnread(0)}
            >
                Mark all as read
            </Button>
        </div>
    )
}
