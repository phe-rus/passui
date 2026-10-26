import { TabView } from "@passui/solid/tab-view"

export function TabViewUsage() {
    return (
        <TabView
            label="Project"
            defaultValue="overview"
            options={[
                { value: "overview", label: "Overview" },
                { value: "activity", label: "Activity" },
            ]}
        >
            {(value) => (
                <p>
                    {value === "overview"
                        ? "Project overview"
                        : "Recent activity"}
                </p>
            )}
        </TabView>
    )
}
