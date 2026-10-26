import { createSignal } from "solid-js"
import { SecureField } from "@passui/solid/secure-field"

export function SecureFieldReveal() {
    const [password, setPassword] =
        createSignal("correct-horse")
    return (
        <div class="w-full max-w-xs">
            <SecureField
                label="Password"
                autocomplete="current-password"
                revealLabels={{ show: "Show", hide: "Hide" }}
                value={password()}
                onInput={(event) =>
                    setPassword(event.currentTarget.value)
                }
            />
        </div>
    )
}
