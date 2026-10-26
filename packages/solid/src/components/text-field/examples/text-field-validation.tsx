import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldValidation() {
    const [email, setEmail] = createSignal("aiko@")
    const valid = () =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())
    return (
        <div class="w-full max-w-xs">
            <TextField
                label="Email"
                type="email"
                description="We only use it to sign you in."
                value={email()}
                onInput={(event) =>
                    setEmail(event.currentTarget.value)
                }
                aria-invalid={!valid()}
                errors={
                    valid()
                        ? []
                        : ["Enter a full email address."]
                }
            />
        </div>
    )
}
