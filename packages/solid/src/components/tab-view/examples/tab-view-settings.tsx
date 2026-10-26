import { TabView } from "@passui/solid/tab-view"

export function TabViewSettings() {
    return (
        <TabView
            label="Settings sections"
            defaultValue="general"
            options={[
                { value: "general", label: "General" },
                { value: "privacy", label: "Privacy" },
            ]}
        >
            {(value) => (
                <p class="p-3">
                    {value === "general"
                        ? "Manage account preferences."
                        : "Choose what you share."}
                </p>
            )}
        </TabView>
    )
}
