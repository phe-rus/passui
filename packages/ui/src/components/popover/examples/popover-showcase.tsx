import { Button } from "@passui/react/button"
import { Popover } from "@passui/react/popover"
import {
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
} from "@passui/react/profile-image"
import { useDismiss } from "@passui/react/use-dismiss"
import { useRef, useState } from "react"

export function PopoverShowcase() {
    const [open, setOpen] = useState(true)
    const anchor = useRef<HTMLDivElement>(null)
    useDismiss(anchor, open, () => setOpen(false))

    return (
        <div className="flex h-80 w-full max-w-sm justify-end">
            <div ref={anchor} className="relative">
                <button
                    type="button"
                    aria-label="Account"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                    className="rounded-full"
                >
                    <ProfileImage className="size-11">
                        <ProfileImageContent src="/avatars/aiko.svg" />
                        <ProfileImageFallback>
                            AK
                        </ProfileImageFallback>
                    </ProfileImage>
                </button>
                <Popover
                    open={open}
                    origin="top-right"
                    role="dialog"
                    aria-label="Account"
                    className="top-full right-0 mt-2 flex w-64 flex-col items-center gap-3 p-5 text-center"
                >
                    <ProfileImage className="size-16 text-title3">
                        <ProfileImageContent src="/avatars/aiko.svg" />
                        <ProfileImageFallback>
                            AK
                        </ProfileImageFallback>
                    </ProfileImage>
                    <div className="flex flex-col">
                        <span className="text-headline font-semibold text-label">
                            Aiko Kamado
                        </span>
                        <span className="text-footnote text-label-secondary">
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
