import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { SecureField } from "@passui/solid/secure-field"
import { toast } from "@passui/solid/toast"

export function SecureFieldShowcase() {
    const [current, setCurrent] = createSignal("")
    const [next, setNext] = createSignal("")
    const tooShort = () =>
        next().length > 0 && next().length < 8
    const reveal = { show: "Show", hide: "Hide" }
    return (
        <form
            class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Password changed")
            }}
        >
            <div class="flex flex-col gap-1">
                <h2 class="text-headline font-semibold text-label">
                    Change password
                </h2>
                <p class="text-footnote text-label-secondary">
                    You stay signed in on this device.
                </p>
            </div>
            <SecureField
                label="Current password"
                autocomplete="current-password"
                revealLabels={reveal}
                value={current()}
                onInput={(event) =>
                    setCurrent(event.currentTarget.value)
                }
            />
            <SecureField
                label="New password"
                autocomplete="new-password"
                description="At least 8 characters."
                revealLabels={reveal}
                aria-invalid={tooShort()}
                errors={
                    tooShort()
                        ? ["Use 8 characters or more."]
                        : []
                }
                value={next()}
                onInput={(event) =>
                    setNext(event.currentTarget.value)
                }
            />
            <Button
                type="submit"
                variant="accent"
                disabled={!current() || next().length < 8}
            >
                Change password
            </Button>
        </form>
    )
}
