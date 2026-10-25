import {
    Delete02Icon,
    Link01Icon,
    Share08Icon,
    StarIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { TextField, toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { useState } from "react"

export function ButtonShowcase() {
    const [name, setName] = useState("Passui launch")
    const [saving, setSaving] = useState(false)

    async function save() {
        setSaving(true)
        await new Promise((resolve) =>
            setTimeout(resolve, 1400)
        )
        setSaving(false)
        toast.success("Project saved")
    }

    return (
        <div className="flex w-full max-w-md flex-col gap-4">
            <section className="flex flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
                <header className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-headline font-semibold text-label">
                            Project settings
                        </h2>
                        <p className="text-footnote text-label-secondary">
                            Changes apply to everyone on the
                            team.
                        </p>
                    </div>
                    <div className="flex gap-1">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Star"
                        >
                            <HugeiconsIcon
                                icon={StarIcon}
                                size={18}
                            />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Copy link"
                        >
                            <HugeiconsIcon
                                icon={Link01Icon}
                                size={18}
                            />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Share"
                        >
                            <HugeiconsIcon
                                icon={Share08Icon}
                                size={18}
                            />
                        </Button>
                    </div>
                </header>
                <TextField
                    label="Project name"
                    value={name}
                    onChange={(event) =>
                        setName(event.target.value)
                    }
                />
                <footer className="flex justify-end gap-2">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setName("Passui launch")
                        }
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="accent"
                        isPending={saving}
                        onClick={save}
                    >
                        Save changes
                    </Button>
                </footer>
            </section>
            <section className="flex items-center justify-between gap-4 rounded-4xl bg-elevated p-5 ring-1 ring-danger/25">
                <div className="flex flex-col gap-1">
                    <span className="text-subheadline font-semibold text-label">
                        Delete project
                    </span>
                    <span className="text-footnote text-label-secondary">
                        This removes every file for good.
                    </span>
                </div>
                <Button variant="destructive" size="sm">
                    <HugeiconsIcon
                        icon={Delete02Icon}
                        size={16}
                    />
                    Delete
                </Button>
            </section>
        </div>
    )
}
