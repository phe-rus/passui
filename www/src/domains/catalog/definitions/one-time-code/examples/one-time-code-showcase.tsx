import { OneTimeCode } from "@passui/react/one-time-code"
import { useState } from "react"

export function OneTimeCodeShowcase() {
    const [value, setValue] = useState("")
    return (
        <div className="w-full max-w-xs">
            <OneTimeCode
                value={value}
                onChange={setValue}
                label="Verification code"
                status={value.length === 6 ? (value === "123456" ? "success" : "error") : "idle"}
                statusLabel={
                    value.length === 6
                        ? value === "123456"
                            ? "Code accepted"
                            : "Try 123456"
                        : "Enter the demo code 123456"
                }
            />
        </div>
    )
}
