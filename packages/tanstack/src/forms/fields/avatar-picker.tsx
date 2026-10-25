import {
    Camera01Icon,
    Delete02Icon,
    Image01Icon,
    TextFontIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
    ProfileImage,
    ProfileImageFallback,
    ProfileImageContent,
} from "@passui/react/profile-image"
import { Button } from "@passui/react/button"
import { Sheet } from "@passui/react/sheet"
import { createPortal } from "react-dom"
import { cn } from "@passui/react/cn"
import { Ambient } from "@passui/react/ambient"

export type AvatarPickerLabels = {
    photo: string
    photoDescription: string
    choosePhoto: string
    takePhoto: string
    capture: string
    monogram: string
    removePhoto: string
    cancel: string
}

type AvatarPickerProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    label: string
    image?: string
    clearable: boolean
    labels: AvatarPickerLabels
    onChooseFile: () => void
    /** A captured frame, still to be framed in Move and Scale. */
    onCapture: (file: File) => void
    /** A finished image that needs no framing, like a monogram. */
    onChoose: (file: File) => void
    onRemove: () => void
}

type CameraViewProps = {
    labels: AvatarPickerLabels
    onCapture: (file: File) => void
    onCancel: () => void
}

type OptionProps = {
    icon: typeof Image01Icon
    tone?: "default" | "destructive"
    onClick: () => void
    children: ReactNode
}

// Apple's contact monogram gradients
const MONOGRAM_GRADIENTS = [
    ["#A1A1A6", "#6E6E73"],
    ["#FF9F0A", "#FF6A00"],
    ["#FF6482", "#FF2D55"],
    ["#BF5AF2", "#8944E3"],
    ["#64D2FF", "#0A84FF"],
    ["#34C759", "#0FA958"],
] as const

function initialsOf(label: string) {
    const parts = label.trim().split(/\s+/).filter(Boolean)
    const letters =
        parts.length > 1
            ? [parts[0], parts[parts.length - 1]]
            : parts
    return (
        letters
            .map((part) => part[0]?.toUpperCase() ?? "")
            .join("") || "?"
    )
}

async function toFile(
    canvas: HTMLCanvasElement,
    name: string,
    type: string
) {
    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, type, 0.92)
    )
    if (!blob) throw new Error("Could not export the image")
    return new File([blob], name, { type })
}

async function renderMonogram(
    initials: string,
    [from, to]: readonly [string, string]
) {
    const size = 512
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const context = canvas.getContext("2d")
    if (!context) throw new Error("Canvas is not available")
    const gradient = context.createLinearGradient(
        0,
        0,
        0,
        size
    )
    gradient.addColorStop(0, from)
    gradient.addColorStop(1, to)
    context.fillStyle = gradient
    context.fillRect(0, 0, size, size)
    context.fillStyle = "#fff"
    context.textAlign = "center"
    context.textBaseline = "middle"
    context.font = `600 ${initials.length > 1 ? 196 : 232}px -apple-system, "SF Pro Rounded", "SF Pro Display", system-ui, sans-serif`
    context.fillText(initials, size / 2, size / 2 + 12)
    return toFile(canvas, "monogram.png", "image/png")
}

function Option({
    icon,
    tone = "default",
    onClick,
    children,
}: OptionProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                "hover:bg-foreground/[0.04] focus-visible:bg-foreground/[0.06] focus-visible:outline-none",
                tone === "destructive" && "text-destructive"
            )}
        >
            <HugeiconsIcon
                icon={icon}
                className="size-4.5 shrink-0 opacity-80"
            />
            {children}
        </button>
    )
}

/** The live selfie view: the frame under a circle, an iOS shutter below. */
function CameraView({
    labels,
    onCapture,
    onCancel,
}: CameraViewProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        let stream: MediaStream | null = null
        navigator.mediaDevices
            .getUserMedia({
                video: {
                    facingMode: "user",
                    width: 1280,
                    height: 1280,
                },
            })
            .then((media) => {
                stream = media
                if (videoRef.current)
                    videoRef.current.srcObject = media
            })
            .catch(() => setFailed(true))
        return () => {
            for (const track of stream?.getTracks() ?? [])
                track.stop()
        }
    }, [])

    async function capture() {
        const video = videoRef.current
        if (!video?.videoWidth) return
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const context = canvas.getContext("2d")
        if (!context) return
        // the preview is mirrored like a mirror; keep the photo matching it
        context.translate(canvas.width, 0)
        context.scale(-1, 1)
        context.drawImage(video, 0, 0)
        onCapture(
            await toFile(canvas, "photo.jpg", "image/jpeg")
        )
    }

    return (
        <div className="flex flex-col items-center gap-5 bg-neutral-950 px-5 pt-8 pb-6">
            <div className="relative size-64 overflow-hidden rounded-full ring-1 ring-white/20">
                {failed ? (
                    <div className="flex size-full items-center justify-center p-8 text-center text-xs text-white/70">
                        {labels.takePhoto}
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="size-full -scale-x-100 object-cover"
                    />
                )}
            </div>
            <div className="grid w-full grid-cols-3 items-center">
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="justify-self-start text-white hover:bg-white/10 hover:text-white"
                    onClick={onCancel}
                >
                    {labels.cancel}
                </Button>
                <button
                    type="button"
                    aria-label={labels.capture}
                    disabled={failed}
                    onClick={() => void capture()}
                    className="size-16 justify-self-center rounded-full border-4 border-white p-1 transition-transform active:scale-95 disabled:opacity-40"
                >
                    <span className="block size-full rounded-full bg-white" />
                </button>
            </div>
        </div>
    )
}

/**
 * The photo sheet Apple shows for a contact photo: the current photo lit by
 * its own colors, then the ways to change it.
 */
export function AvatarPicker({
    open,
    onOpenChange,
    label,
    image,
    clearable,
    labels,
    onChooseFile,
    onCapture,
    onChoose,
    onRemove,
}: AvatarPickerProps) {
    const [mode, setMode] = useState<"menu" | "camera">(
        "menu"
    )
    const [monogramOpen, setMonogramOpen] = useState(false)
    const [canUseCamera, setCanUseCamera] = useState(false)
    const initials = initialsOf(label)

    useEffect(() => {
        setCanUseCamera(
            Boolean(navigator.mediaDevices?.getUserMedia)
        )
    }, [])

    useEffect(() => {
        if (!open) {
            setMode("menu")
            setMonogramOpen(false)
        }
    }, [open])

    if (typeof document === "undefined") return null
    return createPortal(
        <Sheet
            open={open}
            onClose={() => onOpenChange(false)}
            label={
                mode === "camera"
                    ? labels.takePhoto
                    : labels.photo
            }
            className="gap-0 overflow-hidden rounded-3xl p-0 sm:max-w-[22rem]"
        >
            {mode === "camera" ? (
                <>
                    <h2 className="sr-only">
                        {labels.takePhoto}
                    </h2>
                    <CameraView
                        labels={labels}
                        onCapture={onCapture}
                        onCancel={() => setMode("menu")}
                    />
                </>
            ) : (
                <>
                    <Ambient
                        src={image}
                        className="flex flex-col items-center gap-3 px-5 pt-8 pb-6 text-center"
                    >
                        <ProfileImage className="size-28 shadow-[0_12px_32px_-12px_rgb(0_0_0/0.45)] ring-1 ring-white/50">
                            <ProfileImageContent
                                src={image}
                                alt={label}
                            />
                            <ProfileImageFallback className="text-3xl">
                                {initials}
                            </ProfileImageFallback>
                        </ProfileImage>
                        <div className="flex flex-col gap-0.5">
                            <h2>{labels.photo}</h2>
                            <p>{labels.photoDescription}</p>
                        </div>
                    </Ambient>

                    <div className="m-3 flex flex-col divide-y divide-border/40 overflow-hidden rounded-2xl border border-border/35 bg-card shadow-xs">
                        <Option
                            icon={Image01Icon}
                            onClick={onChooseFile}
                        >
                            {labels.choosePhoto}
                        </Option>
                        {canUseCamera && (
                            <Option
                                icon={Camera01Icon}
                                onClick={() =>
                                    setMode("camera")
                                }
                            >
                                {labels.takePhoto}
                            </Option>
                        )}
                        <Option
                            icon={TextFontIcon}
                            onClick={() =>
                                setMonogramOpen(
                                    (current) => !current
                                )
                            }
                        >
                            {labels.monogram}
                        </Option>
                        {monogramOpen && (
                            <div className="flex items-center justify-between gap-2 px-4 py-3">
                                {MONOGRAM_GRADIENTS.map(
                                    (gradient) => (
                                        <button
                                            key={gradient[0]}
                                            type="button"
                                            aria-label={`${labels.monogram} ${gradient[0]}`}
                                            onClick={() =>
                                                void renderMonogram(
                                                    initials,
                                                    gradient
                                                ).then(
                                                    onChoose
                                                )
                                            }
                                            className="flex size-10 items-center justify-center rounded-full text-sm font-semibold text-white shadow-xs ring-1 ring-black/5 transition-transform hover:scale-105 active:scale-95"
                                            style={{
                                                backgroundImage: `linear-gradient(${gradient[0]}, ${gradient[1]})`,
                                            }}
                                        >
                                            {initials}
                                        </button>
                                    )
                                )}
                            </div>
                        )}
                        {clearable && image && (
                            <Option
                                icon={Delete02Icon}
                                tone="destructive"
                                onClick={onRemove}
                            >
                                {labels.removePhoto}
                            </Option>
                        )}
                    </div>

                    <div className="px-3 pb-3">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-full rounded-2xl"
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            {labels.cancel}
                        </Button>
                    </div>
                </>
            )}
        </Sheet>,
        document.body
    )
}
