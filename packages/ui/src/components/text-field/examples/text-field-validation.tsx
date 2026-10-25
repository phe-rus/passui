import { TextField } from "@passui/react/text-field"
import { useState } from "react"

export function TextFieldValidation() {
    const [email, setEmail] = useState("aiko@")
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    return (
        <div className="w-full max-w-xs">
            <TextField
                label="Email"
                type="email"
                description="We only use it to sign you in."
                value={email}
                aria-invalid={!valid}
                errors={
                    valid
                        ? []
                        : ["Enter a full email address."]
                }
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />
        </div>
    )
}
