import { TabView } from "@passui/solid/tab-view"

export function TabViewKeyboard() {
    return (
        <TabView
            label="Workspace views"
            defaultValue="files"
            options={[
                { value: "files", label: "Files" },
                { value: "activity", label: "Activity" },
                { value: "members", label: "Members" },
            ]}
        >
            {(value) => (
                <div class="p-3 text-subheadline">
                    {value === "files"
                        ? "Your files"
                        : value === "activity"
                          ? "Recent changes"
                          : "Your team"}
                </div>
            )}
        </TabView>
    )
}
