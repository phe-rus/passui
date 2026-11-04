import { OneTimeCode } from "@passui/react/one-time-code"
import { useState } from "react"

export function OneTimeCodeDeviceCode() {
    const [value, setValue] = useState("")
    return (
        <div className="w-full max-w-sm space-y-2">
            <OneTimeCode
                label="Device code"
                format="alphanumeric"
                length={8}
                value={value}
                onChange={setValue}
                aria-describedby="device-code-help"
            />
            <p id="device-code-help" className="text-footnote text-label-secondary">
                Enter the code shown on your device. You will review access before approving.
            </p>
        </div>
    )
}
