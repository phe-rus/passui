import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldUsage() {
    const [name, setName] = createSignal("")
    return (
        <div class="w-full max-w-xs">
            <TextField
                label="Name"
                placeholder="Aiko Kamado"
                value={name()}
                onInput={(event) =>
                    setName(event.currentTarget.value)
                }
            />
        </div>
    )
}
