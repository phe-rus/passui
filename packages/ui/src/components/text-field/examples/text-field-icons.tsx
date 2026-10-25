import {
    Link01Icon,
    Mail01Icon,
    Search01Icon,
    Tick02Icon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { TextField } from "@passui/react/text-field"
import { useState } from "react"

export function TextFieldIcons() {
    const [email, setEmail] = useState("aiko@example.com")
    const [site, setSite] = useState("")
    const [query, setQuery] = useState("")
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    return (
        <div className="flex w-full max-w-xs flex-col gap-4">
            <TextField
                label="Email"
                type="email"
                icon={
                    <HugeiconsIcon
                        icon={Mail01Icon}
                        size={18}
                    />
                }
                trailingIcon={
                    valid && (
                        <HugeiconsIcon
                            icon={Tick02Icon}
                            size={18}
                            className="text-success"
                        />
                    )
                }
                value={email}
                onChange={(event) =>
                    setEmail(event.target.value)
                }
            />
            <TextField
                label="Website"
                placeholder="example.com"
                icon={
                    <HugeiconsIcon
                        icon={Link01Icon}
                        size={18}
                    />
                }
                value={site}
                onChange={(event) =>
                    setSite(event.target.value)
                }
            />
            <TextField
                label="Find a member"
                placeholder="Name or email"
                icon={
                    <HugeiconsIcon
                        icon={Search01Icon}
                        size={18}
                    />
                }
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
        </div>
    )
}
