import { createSignal } from "solid-js"
import { LabeledContent } from "@passui/solid/labeled-content"
import { Section } from "@passui/solid/section"
import { toast } from "@passui/solid/toast"
import { Toggle } from "@passui/solid/toggle"

export function ToastShowcase() {
    const [backups, setBackups] = createSignal(true)
    const [alerts, setAlerts] = createSignal(false)
    return (
        <div class="w-full max-w-sm">
            <Section
                title="Account"
                footer="Each change saves at once and confirms with a toast."
            >
                <LabeledContent label="Daily backups">
                    <Toggle
                        label="Daily backups"
                        labelHidden
                        checked={backups()}
                        onChange={(checked) => {
                            setBackups(checked)
                            toast.success(
                                checked
                                    ? "Backups turned on"
                                    : "Backups turned off"
                            )
                        }}
                    />
                </LabeledContent>
                <LabeledContent label="Sign-in alerts">
                    <Toggle
                        label="Sign-in alerts"
                        labelHidden
                        checked={alerts()}
                        onChange={(checked) => {
                            setAlerts(checked)
                            toast(
                                checked
                                    ? "We'll email you about new sign-ins"
                                    : "Sign-in alerts turned off"
                            )
                        }}
                    />
                </LabeledContent>
            </Section>
        </div>
    )
}
