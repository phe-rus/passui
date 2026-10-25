import { TabView } from "@passui/react/tab-view"

export function TabViewUsage() {
    return (
        <TabView
            label="Account"
            defaultValue="profile"
            options={[
                { value: "profile", label: "Profile" },
                { value: "security", label: "Security" },
            ]}
            className="max-w-sm"
        >
            {(value) => (
                <p className="text-center text-callout text-label-secondary">
                    {value === "profile"
                        ? "Your name and photo."
                        : "Your password and passkeys."}
                </p>
            )}
        </TabView>
    )
}
