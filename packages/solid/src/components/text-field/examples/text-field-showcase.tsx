import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { TextField } from "@passui/solid/text-field"
import { toast } from "@passui/solid/toast"

export function TextFieldShowcase() {
    const [name, setName] = createSignal("Aiko Kamado")
    const [role, setRole] = createSignal("Product designer")
    const [site, setSite] = createSignal("")
    return (
        <form
            class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Profile updated")
            }}
        >
            <h2 class="text-headline font-semibold text-label">
                Edit profile
            </h2>
            <TextField
                label="Name"
                value={name()}
                onInput={(event) =>
                    setName(event.currentTarget.value)
                }
            />
            <TextField
                label="Role"
                value={role()}
                onInput={(event) =>
                    setRole(event.currentTarget.value)
                }
            />
            <TextField
                label="Website"
                placeholder="example.com"
                description="Shown on your public profile."
                value={site()}
                onInput={(event) =>
                    setSite(event.currentTarget.value)
                }
            />
            <Button type="submit" variant="accent">
                Save profile
            </Button>
        </form>
    )
}
