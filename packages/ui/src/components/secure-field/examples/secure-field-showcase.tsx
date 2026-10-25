import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { SecureField } from "@passui/react/secure-field"
import { useState } from "react"

export function SecureFieldShowcase() {
    const [current, setCurrent] = useState("")
    const [next, setNext] = useState("")
    const tooShort = next.length > 0 && next.length < 8
    const reveal = { show: "Show", hide: "Hide" }

    return (
        <form
            className="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Password changed")
            }}
        >
            <div className="flex flex-col gap-1">
                <h2 className="text-headline font-semibold text-label">
                    Change password
                </h2>
                <p className="text-footnote text-label-secondary">
                    You stay signed in on this device.
                </p>
            </div>
            <SecureField
                label="Current password"
                autoComplete="current-password"
                revealLabels={reveal}
                value={current}
                onChange={(event) =>
                    setCurrent(event.target.value)
                }
            />
            <SecureField
                label="New password"
                autoComplete="new-password"
                description="At least 8 characters."
                revealLabels={reveal}
                aria-invalid={tooShort}
                errors={
                    tooShort
                        ? ["Use 8 characters or more."]
                        : []
                }
                value={next}
                onChange={(event) =>
                    setNext(event.target.value)
                }
            />
            <Button
                type="submit"
                variant="accent"
                disabled={!current || next.length < 8}
            >
                Change password
            </Button>
        </form>
    )
}
