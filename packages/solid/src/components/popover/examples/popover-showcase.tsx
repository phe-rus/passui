import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { Popover } from "@passui/solid/popover"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/solid/profile-image"

export function PopoverShowcase() {
    const [open, setOpen] = createSignal(true)
    return (
        <div class="flex h-80 w-full max-w-sm justify-end">
            <div class="relative">
                <button
                    type="button"
                    aria-label="Account"
                    aria-expanded={open()}
                    onClick={() => setOpen(!open())}
                    class="rounded-full"
                >
                    <ProfileImage class="size-11">
                        <ProfileImageContent src="/avatars/aiko.svg" />
                        <ProfileImageFallback>
                            AK
                        </ProfileImageFallback>
                    </ProfileImage>
                </button>
                <Popover
                    open={open()}
                    origin="top-right"
                    role="dialog"
                    aria-label="Account"
                    class="top-full right-0 mt-2 flex w-64 flex-col items-center gap-3 p-5 text-center"
                >
                    <ProfileImage class="size-16 text-title3">
                        <ProfileImageContent src="/avatars/aiko.svg" />
                        <ProfileImageFallback>
                            AK
                        </ProfileImageFallback>
                    </ProfileImage>
                    <div class="flex flex-col">
                        <span class="text-headline font-semibold text-label">
                            Aiko Kamado
                        </span>
                        <span class="text-footnote text-label-secondary">
                            aiko@example.com
                        </span>
                    </div>
                    <Button variant="secondary" size="sm">
                        Manage your account
                    </Button>
                </Popover>
            </div>
        </div>
    )
}
