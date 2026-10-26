import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldIcons() {
    const [email, setEmail] = createSignal("")
    return (
        <div class="w-full max-w-sm">
            <TextField
                label="Email"
                type="email"
                value={email()}
                onInput={(event) =>
                    setEmail(event.currentTarget.value)
                }
                placeholder="you@example.com"
                icon={<span aria-hidden="true">✉</span>}
            />
        </div>
    )
}
