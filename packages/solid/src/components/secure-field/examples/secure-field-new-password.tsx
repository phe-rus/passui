import { createSignal } from "solid-js"
import { SecureField } from "@passui/solid/secure-field"
import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"

export function SecureFieldNewPassword() {
    const [next, setNext] = createSignal("")
    const [again, setAgain] = createSignal("")
    const short = () =>
        next().length > 0 && next().length < 12
    const differs = () =>
        again().length > 0 && again() !== next()
    return (
        <form
            class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Password changed")
            }}
        >
            <SecureField
                label="New password"
                autocomplete="new-password"
                description="At least 12 characters."
                errors={
                    short()
                        ? ["Use at least 12 characters."]
                        : []
                }
                value={next()}
                onInput={(event) =>
                    setNext(event.currentTarget.value)
                }
            />
            <SecureField
                label="Confirm password"
                autocomplete="new-password"
                errors={
                    differs()
                        ? ["The passwords don't match."]
                        : []
                }
                value={again()}
                onInput={(event) =>
                    setAgain(event.currentTarget.value)
                }
            />
            <Button
                type="submit"
                variant="accent"
                disabled={
                    !next() ||
                    short() ||
                    differs() ||
                    !again()
                }
            >
                Change password
            </Button>
        </form>
    )
}
