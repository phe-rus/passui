import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { StatTile } from "@passui/solid/stat-tile"
import { TabView } from "@passui/solid/tab-view"

export function TabViewShowcase() {
    return (
        <div class="w-full max-w-md rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
            <TabView
                label="Pass console"
                defaultValue="overview"
                options={[
                    { value: "overview", label: "Overview" },
                    { value: "members", label: "Members" },
                    { value: "settings", label: "Settings" },
                ]}
            >
                {(tab) =>
                    tab === "overview" ? (
                        <div class="grid grid-cols-2 gap-3">
                            <StatTile
                                label="Sign ins today"
                                value={128}
                            />
                            <StatTile
                                label="Failed sign ins"
                                value={3}
                                tone="critical"
                            />
                        </div>
                    ) : tab === "members" ? (
                        <Section title="Team">
                            <LabeledContent label="Aiko Kamado">
                                Owner
                            </LabeledContent>
                            <LabeledContent label="Kenji Mori">
                                Admin
                            </LabeledContent>
                        </Section>
                    ) : (
                        <Section title="Project">
                            <LabeledContent label="Name">
                                Pass
                            </LabeledContent>
                            <LabeledContent label="Region">
                                Europe
                            </LabeledContent>
                        </Section>
                    )
                }
            </TabView>
        </div>
    )
}
