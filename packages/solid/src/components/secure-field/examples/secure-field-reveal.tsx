import { SecureField } from "@passui/solid/secure-field"

export function SecureFieldReveal() {
    return (
        <div class="w-full max-w-sm">
            <SecureField
                label="Current password"
                autocomplete="current-password"
                revealLabels={{ show: "Show", hide: "Hide" }}
            />
        </div>
    )
}
