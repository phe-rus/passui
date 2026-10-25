import {
    ProfileImage,
    ProfileImageFallback,
    ProfileImageContent,
} from "@passui/react/profile-image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Delete02Icon } from "@hugeicons/core-free-icons"
import { Button } from "@passui/react/button"
import { useFieldContext } from "../contexts"
import { useEffect, useRef, useState } from "react"
import type { DragEvent, ReactNode } from "react"
import { cn } from "@passui/react/cn"
import { Ambient } from "@passui/react/ambient"
import { AvatarPicker } from "./avatar-picker"
import type { AvatarPickerLabels } from "./avatar-picker"

// A field's value has three real states, not two: `null` (untouched, keep
// whatever's already there), a `File` (a new one was picked), and `false`
// (explicitly cleared, distinct from untouched — only reachable when
// `clearable` is on). The submitting form reads this to decide whether to
// upload a new file, send an explicit clear, or omit the field entirely.
export type FieldAvatarValue = File | null | false

export type FieldAvatarLabels = AvatarPickerLabels & {
    edit: string
    remove: string
    /** Shown under a picked photo until it's kept or dropped. */
    confirmHint: string
    save: string
}

type FieldAvatarProps = {
    /** Compact identity row for account settings. */
    compact?: boolean
    existingImage?: string | null
    label: string
    accept?: string
    /** Offer removing the image once there is one. Off by default: a
     * personal avatar usually just gets replaced, not cleared to nothing. */
    clearable?: boolean
    /** Sit the photo in a surface lit by its own colors, with this under it. */
    caption?: ReactNode
    /** For a translated UI; English otherwise. */
    labels?: Partial<FieldAvatarLabels>
}

const DEFAULT_LABELS: FieldAvatarLabels = {
    edit: "Edit",
    remove: "Remove",
    confirmHint:
        "Press Enter to use this photo, Esc to cancel",
    save: "Use photo",
    cancel: "Cancel",
    photo: "Photo",
    photoDescription: "Choose how you appear.",
    choosePhoto: "Choose Photo…",
    takePhoto: "Take Photo",
    capture: "Take photo",
    monogram: "Monogram",
    removePhoto: "Remove Photo",
}

const imageFrom = (files: FileList | null | undefined) =>
    [...(files ?? [])].find((file) =>
        file.type.startsWith("image/")
    ) ?? null

/**
 * A photo you click to replace: a small menu (choose, take, monogram), then
 * the new image shows in place and Enter keeps it (Esc drops it); no cropping dialog.
 */
export function FieldAvatar({
    compact = false,
    existingImage,
    label,
    accept = "image/png,image/webp,image/jpeg,image/svg+xml",
    clearable = false,
    caption,
    labels,
}: FieldAvatarProps) {
    const text = { ...DEFAULT_LABELS, ...labels }
    const field = useFieldContext<FieldAvatarValue>()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [pending, setPending] = useState<File | null>(null)
    const [sheetOpen, setSheetOpen] = useState(false)
    const [dragOver, setDragOver] = useState(false)
    const [preview, setPreview] = useState<string | null>(
        null
    )
    const isCleared = field.state.value === false
    const shown = pending ?? field.state.value

    useEffect(() => {
        if (!(shown instanceof File)) {
            setPreview(null)
            return
        }
        const url = URL.createObjectURL(shown)
        setPreview(url)
        return () => URL.revokeObjectURL(url)
    }, [shown])

    // while a picked photo waits, Enter keeps it and Escape drops it
    useEffect(() => {
        if (!pending) return
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault()
                keep()
            }
            if (event.key === "Escape") setPending(null)
        }
        window.addEventListener("keydown", onKey)
        return () =>
            window.removeEventListener("keydown", onKey)
    })

    function keep() {
        if (!pending) return
        field.handleChange(pending)
        setPending(null)
    }

    const currentImage = isCleared
        ? undefined
        : (preview ?? existingImage ?? undefined)
    const canClear =
        clearable &&
        !pending &&
        !isCleared &&
        Boolean(currentImage)

    function onDrop(event: DragEvent<HTMLButtonElement>) {
        event.preventDefault()
        setDragOver(false)
        const file = imageFrom(event.dataTransfer.files)
        if (file) setPending(file)
    }

    const photo = (
        <div className="flex w-fit flex-col items-center gap-3">
            <button
                type="button"
                onClick={() => setSheetOpen(true)}
                onDragOver={(event) => {
                    event.preventDefault()
                    setDragOver(true)
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onPaste={(event) => {
                    const file = imageFrom(
                        event.clipboardData.files
                    )
                    if (file) setPending(file)
                }}
                className={cn(
                    "group relative rounded-full outline-none",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-label={`${text.edit} ${label}`}
            >
                <ProfileImage
                    className={cn(
                        "relative ring-1 ring-white/40",
                        compact ? "size-16!" : "size-43!",
                        caption &&
                            !compact &&
                            "shadow-[0_16px_40px_-16px_rgb(0_0_0/0.5)]",
                        "transition-transform duration-300 ease-out group-hover:scale-[1.02] group-active:scale-[0.98]",
                        (dragOver || pending) &&
                            "scale-[1.04]"
                    )}
                >
                    <ProfileImageContent
                        src={currentImage}
                        alt={label}
                        className="object-cover transition-[filter] duration-300 group-hover:brightness-90"
                    />
                    <ProfileImageFallback
                        className={
                            compact ? "text-xl" : "text-4xl"
                        }
                    >
                        {(
                            label.charAt(0) || "?"
                        ).toUpperCase()}
                    </ProfileImageFallback>
                </ProfileImage>
                {/* the frosted "Edit" capsule sitting on the photo's lower edge */}
                {!pending && (
                    <span
                        className={cn(
                            "absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1",
                            "bg-black/35 text-xs font-medium text-white backdrop-blur-md",
                            "opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100",
                            dragOver && "opacity-100"
                        )}
                    >
                        {text.edit}
                    </span>
                )}
            </button>
            {pending && (
                <div className="flex flex-col items-center gap-2 animate-in fade-in-0 slide-in-from-top-1 duration-300">
                    <p className="text-muted-foreground">
                        {text.confirmHint}
                    </p>
                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setPending(null)}
                        >
                            {text.cancel}
                        </Button>
                        <Button
                            variant="default"
                            type="button"
                            size="sm"
                            onClick={keep}
                        >
                            {text.save}
                        </Button>
                    </div>
                </div>
            )}
            {canClear && !caption && (
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={() => field.handleChange(false)}
                >
                    <HugeiconsIcon icon={Delete02Icon} />
                    {text.remove}
                </Button>
            )}
        </div>
    )

    return (
        <>
            {compact ? (
                <div className="flex min-w-0 flex-wrap items-center gap-4">
                    {photo}
                    {!pending && caption}
                </div>
            ) : caption ? (
                <Ambient
                    src={currentImage}
                    className="flex w-full flex-col items-center gap-4 pt-6 pb-2 text-center"
                >
                    {photo}
                    {!pending && caption}
                </Ambient>
            ) : (
                photo
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    e.target.value = ""
                    if (file) setPending(file)
                }}
            />
            <AvatarPicker
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                label={label}
                image={currentImage}
                clearable={clearable}
                labels={text}
                onChooseFile={() => {
                    setSheetOpen(false)
                    fileInputRef.current?.click()
                }}
                onCapture={(file) => {
                    setSheetOpen(false)
                    setPending(file)
                }}
                onChoose={(file) => {
                    setSheetOpen(false)
                    field.handleChange(file)
                }}
                onRemove={() => {
                    setSheetOpen(false)
                    field.handleChange(false)
                }}
            />
        </>
    )
}
