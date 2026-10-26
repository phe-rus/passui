/** @jsxImportSource solid-js */
import {
    createEffect,
    createSignal,
    onCleanup,
    Show,
    type JSX,
} from "solid-js"
import {
    Ambient,
    Button,
    ProfileImage,
    ProfileImageContent,
    ProfileImageFallback,
    Sheet,
} from "@passui/solid"
import { useFieldContext } from "../forms/contexts"
export type FieldAvatarValue = File | null | false
export type FieldAvatarLabels = {
    edit: string
    remove: string
    confirmHint: string
    save: string
    cancel: string
    photo: string
    photoDescription: string
    choosePhoto: string
    takePhoto: string
    capture: string
    monogram: string
    removePhoto: string
}
export function FieldAvatar(props: {
    compact?: boolean
    existingImage?: string | null
    label: string
    accept?: string
    clearable?: boolean
    caption?: JSX.Element
    labels?: Partial<FieldAvatarLabels>
}) {
    const field = useFieldContext<FieldAvatarValue>()
    const [pending, setPending] = createSignal<File | null>(
            null
        ),
        [open, setOpen] = createSignal(false),
        [camera, setCamera] = createSignal(false),
        [preview, setPreview] = createSignal<string>(),
        [error, setError] = createSignal("")
    let input!: HTMLInputElement
    const labels = () => ({
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
        ...props.labels,
    })
    createEffect(() => {
        const shown = pending() ?? field().state.value
        if (!(shown instanceof File)) {
            setPreview(undefined)
            return
        }
        const url = URL.createObjectURL(shown)
        setPreview(url)
        onCleanup(() => URL.revokeObjectURL(url))
    })
    const image = () =>
        field().state.value === false && !pending()
            ? undefined
            : (preview() ?? props.existingImage ?? undefined)
    function keep() {
        const file = pending()
        if (file) {
            field().handleChange(file)
            field().handleBlur()
            setPending(null)
        }
    }
    createEffect(() => {
        if (!pending()) return
        const key = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                event.preventDefault()
                keep()
            }
            if (event.key === "Escape") setPending(null)
        }
        window.addEventListener("keydown", key)
        onCleanup(() =>
            window.removeEventListener("keydown", key)
        )
    })
    function pick(files: FileList | null) {
        const file = Array.from(files ?? []).find((file) =>
            file.type.startsWith("image/")
        )
        if (file) setPending(file)
    }
    async function monogram() {
        const canvas = document.createElement("canvas")
        canvas.width = canvas.height = 512
        const context = canvas.getContext("2d")
        if (!context) return
        const style = getComputedStyle(input.parentElement!)
        context.fillStyle =
            style.getPropertyValue("--color-accent").trim() ||
            style.color
        context.fillRect(0, 0, 512, 512)
        context.fillStyle = "white"
        context.font = "240px system-ui"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillText(
            props.label
                .trim()
                .split(/\s+/)
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase(),
            256,
            270
        )
        const blob = await new Promise<Blob | null>(
            (resolve) => canvas.toBlob(resolve, "image/png")
        )
        if (blob) {
            field().handleChange(
                new File([blob], "monogram.png", {
                    type: "image/png",
                })
            )
            field().handleBlur()
            setOpen(false)
        }
    }
    return (
        <Ambient
            src={
                props.caption && !props.compact
                    ? image()
                    : undefined
            }
            class={
                props.compact
                    ? "flex flex-wrap items-center gap-4"
                    : "flex flex-col items-center gap-4"
            }
        >
            <div class="flex flex-col items-center gap-3">
                <button
                    type="button"
                    aria-label={`${labels().edit} ${props.label}`}
                    onClick={() => setOpen(true)}
                    onDragOver={(event) =>
                        event.preventDefault()
                    }
                    onDrop={(event) => {
                        event.preventDefault()
                        pick(
                            event.dataTransfer?.files ?? null
                        )
                    }}
                    onPaste={(event) =>
                        pick(
                            event.clipboardData?.files ?? null
                        )
                    }
                    class="rounded-full focus-visible:ring-2 focus-visible:ring-accent"
                >
                    <ProfileImage
                        class={
                            props.compact
                                ? "size-16"
                                : "size-43"
                        }
                    >
                        <ProfileImageContent
                            src={image()}
                            alt={props.label}
                        />
                        <ProfileImageFallback>
                            {props.label
                                .slice(0, 1)
                                .toUpperCase()}
                        </ProfileImageFallback>
                    </ProfileImage>
                </button>
                <Show when={pending()}>
                    <p class="text-footnote text-label-secondary">
                        {labels().confirmHint}
                    </p>
                    <div class="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setPending(null)}
                        >
                            {labels().cancel}
                        </Button>
                        <Button onClick={keep}>
                            {labels().save}
                        </Button>
                    </div>
                </Show>
            </div>
            <Show when={!pending()}>{props.caption}</Show>
            <input
                ref={input}
                hidden
                type="file"
                accept={
                    props.accept ??
                    "image/png,image/webp,image/jpeg,image/svg+xml"
                }
                onChange={(event) => {
                    pick(event.currentTarget.files)
                    event.currentTarget.value = ""
                }}
            />
            <Sheet
                open={open()}
                label={labels().photo}
                onClose={() => {
                    setOpen(false)
                    setCamera(false)
                }}
            >
                <div class="flex flex-col gap-3 p-5">
                    <p>{labels().photoDescription}</p>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setOpen(false)
                            input.click()
                        }}
                    >
                        {labels().choosePhoto}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setError("")
                            setCamera(true)
                        }}
                    >
                        {labels().takePhoto}
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            void monogram().catch((error) =>
                                setError(String(error))
                            )
                        }
                    >
                        {labels().monogram}
                    </Button>
                    <Show when={props.clearable && image()}>
                        <Button
                            variant="destructive"
                            onClick={() => {
                                field().handleChange(false)
                                field().handleBlur()
                                setOpen(false)
                            }}
                        >
                            {labels().removePhoto}
                        </Button>
                    </Show>
                    <Show when={camera()}>
                        <Camera
                            captureLabel={labels().capture}
                            onError={setError}
                            onCapture={(file) => {
                                setPending(file)
                                setCamera(false)
                                setOpen(false)
                            }}
                        />
                    </Show>
                    <Show when={error()}>
                        <p role="alert">{error()}</p>
                    </Show>
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setOpen(false)
                            setCamera(false)
                        }}
                    >
                        {labels().cancel}
                    </Button>
                </div>
            </Sheet>
        </Ambient>
    )
}
function Camera(props: {
    captureLabel: string
    onCapture: (file: File) => void
    onError: (message: string) => void
}) {
    let video!: HTMLVideoElement,
        stream: MediaStream | undefined,
        disposed = false
    createEffect(() => {
        void navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "user" } })
            .then((value) => {
                if (disposed) {
                    value.getTracks().forEach((track) => {
                        track.stop()
                    })
                    return
                }
                stream = value
                video.srcObject = value
                void video.play()
            })
            .catch((error) => props.onError(String(error)))
        onCleanup(() => {
            disposed = true
            stream?.getTracks().forEach((track) => {
                track.stop()
            })
        })
    })
    function capture() {
        if (!video.videoWidth) return
        const canvas = document.createElement("canvas")
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        canvas.getContext("2d")?.drawImage(video, 0, 0)
        canvas.toBlob(
            (blob) => {
                if (blob && !disposed)
                    props.onCapture(
                        new File([blob], "photo.jpg", {
                            type: "image/jpeg",
                        })
                    )
            },
            "image/jpeg",
            0.92
        )
    }
    return (
        <div class="flex flex-col gap-3">
            <video
                ref={video}
                muted
                playsinline
                class="max-h-64 rounded-xl"
            />
            <Button onClick={capture}>
                {props.captureLabel}
            </Button>
        </div>
    )
}
