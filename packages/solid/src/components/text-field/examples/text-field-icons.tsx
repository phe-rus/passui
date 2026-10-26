import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"

export function TextFieldIcons() {
    const [email, setEmail] = createSignal("aiko@example.com")
    const [site, setSite] = createSignal("")
    const [query, setQuery] = createSignal("")
    const valid = () =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email())
    return (
        <div class="flex w-full max-w-xs flex-col gap-4">
            <TextField
                label="Email"
                type="email"
                value={email()}
                onInput={(event) =>
                    setEmail(event.currentTarget.value)
                }
                icon={<span aria-hidden="true">✉</span>}
                trailingIcon={
                    valid() ? (
                        <span
                            aria-hidden="true"
                            class="text-success"
                        >
                            ✓
                        </span>
                    ) : undefined
                }
            />
            <TextField
                label="Website"
                placeholder="example.com"
                icon={<span aria-hidden="true">↗</span>}
                value={site()}
                onInput={(event) =>
                    setSite(event.currentTarget.value)
                }
            />
            <TextField
                label="Find a member"
                placeholder="Name or email"
                icon={<span aria-hidden="true">⌕</span>}
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
        </div>
    )
}
