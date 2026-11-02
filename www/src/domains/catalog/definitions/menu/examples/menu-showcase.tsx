import { Menu } from "@passui/react/menu"
import { toast } from "@passui/react/toast"

export function MenuShowcase() {
    return (
        <section className="flex w-full max-w-sm items-center justify-between rounded-3xl bg-surface p-5">
            <span className="font-semibold">Project notes</span>
            <Menu
                label="Project actions"
                variant="secondary"
                edge="trailing"
                items={[
                    { label: "Share", onSelect: () => toast("Shared") },
                    { label: "Archive", onSelect: () => toast("Archived") },
                ]}
            >
                Actions
            </Menu>
        </section>
    )
}
