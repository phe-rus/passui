import { Menu } from "@passui/react/menu"
import { toast } from "@passui/react/toast"

export function MenuActions() {
    return (
        <Menu
            label="File actions"
            items={[
                { heading: "File" },
                { label: "Rename", onSelect: () => toast("Rename selected") },
                "divider",
                { label: "Delete", destructive: true, onSelect: () => toast("Delete selected") },
            ]}
        >
            File actions
        </Menu>
    )
}
