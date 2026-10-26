/** @jsxImportSource solid-js */
import { SecureField } from "@passui/solid/secure-field"

export function SecureFieldUsage() {
    return (
        <SecureField
            label="Password"
            revealLabels={{ show: "Show", hide: "Hide" }}
            autocomplete="current-password"
        />
    )
}
