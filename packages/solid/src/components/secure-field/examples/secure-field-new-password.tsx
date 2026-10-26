import { createSignal } from "solid-js"
import { SecureField } from "@passui/solid/secure-field"

export function SecureFieldNewPassword() {
    const [password, setPassword] = createSignal("")
    return (
        <div class="grid w-full max-w-sm gap-2">
            <SecureField
                label="New password"
                autocomplete="new-password"
                value={password()}
                onInput={(event) =>
                    setPassword(event.currentTarget.value)
                }
                revealLabels={{ show: "Show", hide: "Hide" }}
            />
            <p
                class="text-footnote text-label-secondary"
                role="status"
            >
                {password().length >= 12
                    ? "Length requirement met"
                    : "Use at least 12 characters"}
            </p>
        </div>
    )
}
