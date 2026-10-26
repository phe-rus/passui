import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldValidation() {
    const [email, setEmail] = createSignal("")
    const valid = () =>
        !email() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())
    return (
        <div class="grid w-full max-w-sm gap-2">
            <TextField
                label="Work email"
                type="email"
                value={email()}
                onInput={(event) =>
                    setEmail(event.currentTarget.value)
                }
                aria-invalid={!valid()}
                placeholder="name@company.com"
            />
            <p class="text-footnote" role="status">
                {valid()
                    ? "We'll use this for updates."
                    : "Enter a valid email address."}
            </p>
        </div>
    )
}
