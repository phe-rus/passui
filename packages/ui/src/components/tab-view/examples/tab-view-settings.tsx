import { LabeledContent, Section } from "@passui/react"
import { TabView } from "@passui/react/tab-view"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function TabViewSettings() {
    const [sounds, setSounds] = useState(true)
    const [badges, setBadges] = useState(false)

    return (
        <div className="w-full max-w-sm rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <TabView
                label="Settings"
                defaultValue="notifications"
                options={[
                    {
                        value: "notifications",
                        label: "Notifications",
                    },
                    { value: "privacy", label: "Privacy" },
                ]}
            >
                {(tab) =>
                    tab === "notifications" ? (
                        <Section>
                            <LabeledContent label="Sounds">
                                <Toggle
                                    label="Sounds"
                                    labelHidden
                                    checked={sounds}
                                    onChange={setSounds}
                                />
                            </LabeledContent>
                            <LabeledContent label="Badges">
                                <Toggle
                                    label="Badges"
                                    labelHidden
                                    checked={badges}
                                    onChange={setBadges}
                                />
                            </LabeledContent>
                        </Section>
                    ) : (
                        <Section footer="Only people you share with can see your profile.">
                            <LabeledContent label="Profile">
                                <span className="text-subheadline text-label-secondary">
                                    Private
                                </span>
                            </LabeledContent>
                        </Section>
                    )
                }
            </TabView>
        </div>
    )
}
