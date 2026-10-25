import { SecureField } from "@passui/react/secure-field"
import { useState } from "react"

export function SecureFieldReveal() {
    const [password, setPassword] = useState("correct-horse")

    return (
        <div className="w-full max-w-xs">
            <SecureField
                label="Password"
                autoComplete="current-password"
                revealLabels={{ show: "Show", hide: "Hide" }}
                value={password}
                onChange={(event) =>
                    setPassword(event.target.value)
                }
            />
        </div>
    )
}
