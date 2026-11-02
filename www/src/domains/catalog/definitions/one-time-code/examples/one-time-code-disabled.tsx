import { OneTimeCode } from "@passui/react/one-time-code"
import { useState } from "react"

export function OneTimeCodeDisabled() {
    const [value, setValue] = useState("123456")
    return (
        <div className="w-full max-w-xs">
            <OneTimeCode value={value} onChange={setValue} label="Unavailable code" disabled />
        </div>
    )
}
