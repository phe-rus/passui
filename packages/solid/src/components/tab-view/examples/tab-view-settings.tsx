import { createSignal, Show } from "solid-js"
import { TabView } from "@passui/solid/tab-view"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { Toggle } from "@passui/solid/toggle"

export function TabViewSettings() {
    const [sounds, setSounds] = createSignal(true)
    const [badges, setBadges] = createSignal(false)
    return (
        <div class="w-full max-w-sm rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
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
                {(tab) => (
                    <Show
                        when={tab === "notifications"}
                        fallback={
                            <Section footer="Only people you share with can see your profile.">
                                <LabeledContent label="Profile">
                                    <span class="text-subheadline text-label-secondary">
                                        Private
                                    </span>
                                </LabeledContent>
                            </Section>
                        }
                    >
                        <Section>
                            <LabeledContent label="Sounds">
                                <Toggle
                                    label="Sounds"
                                    labelHidden
                                    checked={sounds()}
                                    onChange={setSounds}
                                />
                            </LabeledContent>
                            <LabeledContent label="Badges">
                                <Toggle
                                    label="Badges"
                                    labelHidden
                                    checked={badges()}
                                    onChange={setBadges}
                                />
                            </LabeledContent>
                        </Section>
                    </Show>
                )}
            </TabView>
        </div>
    )
}
