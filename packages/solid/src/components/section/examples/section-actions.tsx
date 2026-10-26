import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { Section } from "@passui/solid/section"

export function SectionActions() {
    const [editing, setEditing] = createSignal(false)
    return (
        <Section title="Account details">
            <div class="flex items-center justify-between gap-3 p-4">
                <p>
                    {editing()
                        ? "Editing account details"
                        : "Your personal account"}
                </p>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditing(!editing())}
                >
                    {editing() ? "Done" : "Edit"}
                </Button>
            </div>
        </Section>
    )
}
