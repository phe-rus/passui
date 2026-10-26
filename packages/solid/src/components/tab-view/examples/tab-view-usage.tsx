import { TabView } from "@passui/solid/tab-view"

export function TabViewUsage() {
    return (
        <TabView
            label="Account"
            defaultValue="profile"
            options={[
                { value: "profile", label: "Profile" },
                { value: "security", label: "Security" },
            ]}
            class="max-w-sm"
        >
            {(value) => (
                <p class="text-center text-callout text-label-secondary">
                    {value === "profile"
                        ? "Your name and photo."
                        : "Your password and passkeys."}
                </p>
            )}
        </TabView>
    )
}
