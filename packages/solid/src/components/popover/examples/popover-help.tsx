import { createSignal } from "solid-js"
import { Popover } from "@passui/solid/popover"
import { TextField } from "@passui/solid/text-field"
import { IconButton } from "@passui/solid/icon-button"
import { InformationCircleIcon } from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

export function PopoverHelp() {
    const [open, setOpen] = createSignal(false)
    const [uri, setUri] = createSignal(
        "https://app.example.com/callback"
    )
    return (
        <div class="flex h-72 w-full max-w-sm flex-col gap-2">
            <TextField
                label="Redirect URI"
                value={uri()}
                onInput={(event) =>
                    setUri(event.currentTarget.value)
                }
                action={
                    <div class="relative">
                        <IconButton
                            label="What's a redirect URI?"
                            size="icon-xs"
                            variant="ghost"
                            aria-expanded={open()}
                            onClick={() => setOpen(!open())}
                        >
                            <Hugeicon
                                icon={InformationCircleIcon}
                                size={18}
                            />
                        </IconButton>
                        <Popover
                            open={open()}
                            origin="top-right"
                            role="dialog"
                            aria-label="Redirect URI"
                            class="top-full right-0 mt-2 w-64 p-4"
                        >
                            <p class="text-footnote text-label">
                                Where Pass sends people back
                                after they sign in. It must
                                match your app exactly.
                            </p>
                        </Popover>
                    </div>
                }
            />
        </div>
    )
}
