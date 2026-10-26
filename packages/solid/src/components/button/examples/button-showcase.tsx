import { createSignal, onCleanup } from "solid-js"
import { TextField } from "@passui/solid/text-field"
import { toast } from "@passui/solid/toast"
import { Button } from "@passui/solid/button"
import {
    Delete02Icon,
    Link01Icon,
    Share08Icon,
    StarIcon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function ButtonShowcase() {
    const [name, setName] = createSignal("Passui launch")
    const [saving, setSaving] = createSignal(false)
    let timer: ReturnType<typeof setTimeout> | undefined
    onCleanup(() => clearTimeout(timer))
    function save() {
        setSaving(true)
        timer = setTimeout(() => {
            setSaving(false)
            toast.success("Project saved")
        }, 1400)
    }
    return (
        <div class="flex w-full max-w-md flex-col gap-4">
            <section class="flex flex-col gap-5 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60">
                <header class="flex items-start justify-between gap-4">
                    <div class="flex flex-col gap-1">
                        <h2 class="text-headline font-semibold text-label">
                            Project settings
                        </h2>
                        <p class="text-footnote text-label-secondary">
                            Changes apply to everyone on the
                            team.
                        </p>
                    </div>
                    <div class="flex gap-1">
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Star"
                        >
                            <Hugeicon
                                icon={StarIcon}
                                size={18}
                            />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Copy link"
                        >
                            <Hugeicon
                                icon={Link01Icon}
                                size={18}
                            />
                        </Button>
                        <Button
                            size="icon-sm"
                            variant="ghost"
                            aria-label="Share"
                        >
                            <Hugeicon
                                icon={Share08Icon}
                                size={18}
                            />
                        </Button>
                    </div>
                </header>
                <TextField
                    label="Project name"
                    value={name()}
                    onInput={(event) =>
                        setName(event.currentTarget.value)
                    }
                />
                <footer class="flex justify-end gap-2">
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
                        isPending={saving()}
                        onClick={save}
                    >
                        Save changes
                    </Button>
                </footer>
            </section>
            <section class="flex items-center justify-between gap-4 rounded-4xl bg-elevated p-5 ring-1 ring-danger/25">
                <div class="flex flex-col gap-1">
                    <span class="text-subheadline font-semibold text-label">
                        Delete project
                    </span>
                    <span class="text-footnote text-label-secondary">
                        This removes every file for good.
                    </span>
                </div>
                <Button variant="destructive" size="sm">
                    <Hugeicon icon={Delete02Icon} size={16} />{" "}
                    Delete
                </Button>
            </section>
        </div>
    )
}
