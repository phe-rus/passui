import { Menu } from "@passui/react/menu"
import { toast } from "@passui/react/toast"
import { ArchiveIcon, MoreIcon, PinIcon, ShareIcon, TrashIcon } from "@passui/react/icons"

export function MenuShowcase() {
    return (
        <section className="flex w-full max-w-sm items-center justify-between gap-4 rounded-3xl bg-surface p-4 ring-1 ring-separator/60">
            <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                    <PinIcon size={18} />
                </span>
                <span className="flex min-w-0 flex-col">
                    <strong className="truncate text-subheadline font-semibold text-label">
                        Project notes
                    </strong>
                    <span className="text-caption text-label-secondary">Updated just now</span>
                </span>
            </div>
            <Menu
                label="Project note actions"
                variant="ghost"
                size="icon-sm"
                edge="trailing"
                items={[
                    {
                        label: "Share",
                        icon: <ShareIcon size={16} />,
                        onSelect: () => toast("Shared"),
                    },
                    {
                        label: "Pin",
                        icon: <PinIcon size={16} />,
                        checked: true,
                        onSelect: () => toast("Pinned"),
                    },
                    {
                        label: "Archive",
                        icon: <ArchiveIcon size={16} />,
                        onSelect: () => toast("Archived"),
                    },
                    "divider",
                    {
                        label: "Delete",
                        icon: <TrashIcon size={16} />,
                        destructive: true,
                        onSelect: () => toast("Moved to Recently Deleted"),
                    },
                ]}
            >
                <MoreIcon size={18} />
            </Menu>
        </section>
    )
}
