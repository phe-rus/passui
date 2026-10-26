import { createSignal } from "solid-js"
import { TextField } from "@passui/solid/text-field"
import {
    Link01Icon,
    Mail01Icon,
    Search01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

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
                icon={
                    <Hugeicon icon={Mail01Icon} size={18} />
                }
                trailingIcon={
                    valid() ? (
                        <Hugeicon
                            icon={Tick02Icon}
                            size={18}
                            class="text-success"
                        />
                    ) : undefined
                }
            />
            <TextField
                label="Website"
                placeholder="example.com"
                icon={
                    <Hugeicon icon={Link01Icon} size={18} />
                }
                value={site()}
                onInput={(event) =>
                    setSite(event.currentTarget.value)
                }
            />
            <TextField
                label="Find a member"
                placeholder="Name or email"
                icon={
                    <Hugeicon icon={Search01Icon} size={18} />
                }
                value={query()}
                onInput={(event) =>
                    setQuery(event.currentTarget.value)
                }
            />
        </div>
    )
}
