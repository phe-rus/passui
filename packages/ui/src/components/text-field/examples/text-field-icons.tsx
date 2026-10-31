import {
    CheckIcon,
    LinkIcon,
    MailIcon,
    SearchIcon,
} from "@passui/react/icons"
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
                icon={<MailIcon size={18} />}
                trailingIcon={
                    valid && (
                        <CheckIcon
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
                icon={<LinkIcon size={18} />}
                value={site}
                onChange={(event) =>
                    setSite(event.target.value)
                }
            />
            <TextField
                label="Find a member"
                placeholder="Name or email"
                icon={<SearchIcon size={18} />}
                value={query}
                onChange={(event) =>
                    setQuery(event.target.value)
                }
            />
        </div>
    )
}
