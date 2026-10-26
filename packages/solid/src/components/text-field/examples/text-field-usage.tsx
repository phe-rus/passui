import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldUsage() {
    const [value, setValue] = createSignal("")
    return (
        <TextField
            label="Name"
            value={value()}
            onInput={(event) =>
                setValue(event.currentTarget.value)
            }
            placeholder="Your name"
        />
    )
}
