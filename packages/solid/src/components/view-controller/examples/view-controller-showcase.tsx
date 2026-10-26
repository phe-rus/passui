import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { TextField } from "@passui/solid/text-field"
import { toast } from "@passui/solid/toast"
import { ViewController } from "@passui/solid/view-controller"

export function ViewControllerShowcase() {
    const [email, setEmail] = createSignal("")
    return (
        <div class="w-full max-w-sm rounded-4xl bg-elevated px-6 shadow-sm ring-1 ring-separator/60">
            <ViewController
                class="gap-6 py-8"
                heading={
                    <ViewController.Heading
                        size="compact"
                        title="Sign in"
                        description="Use your Pass account."
                    />
                }
            >
                <form
                    class="flex flex-col gap-4"
                    onSubmit={(event) => {
                        event.preventDefault()
                        toast.success("Check your email")
                    }}
                >
                    <TextField
                        label="Email"
                        type="email"
                        placeholder="you@example.com"
                        value={email()}
                        onInput={(event) =>
                            setEmail(
                                event.currentTarget.value
                            )
                        }
                    />
                    <Button type="submit" variant="accent">
                        Continue
                    </Button>
                </form>
            </ViewController>
        </div>
    )
}
