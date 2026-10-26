import {
    createContext,
    createEffect,
    createSignal,
    mergeProps,
    Show,
    splitProps,
    useContext,
    type Accessor,
    type JSX,
} from "solid-js"
import { cn } from "../../lib/class-names"
import { callHandler } from "../../lib/events"
const ImageContext = createContext<{
    loaded: Accessor<boolean>
    setLoaded: (value: boolean) => void
}>({ loaded: () => false, setLoaded: () => {} })
export interface ProfileImageProps
    extends JSX.HTMLAttributes<HTMLSpanElement> {
    className?: string
}
export function ProfileImage(props: ProfileImageProps) {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
        "children",
    ])
    const [loaded, setLoaded] = createSignal(false)
    return (
        <ImageContext.Provider value={{ loaded, setLoaded }}>
            <span
                {...rest}
                class={cn(
                    "relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-fill text-label-secondary",
                    local.class,
                    local.className
                )}
            >
                {local.children}
            </span>
        </ImageContext.Provider>
    )
}
export interface ProfileImageContentProps
    extends JSX.ImgHTMLAttributes<HTMLImageElement> {
    className?: string
}
export function ProfileImageContent(
    props: ProfileImageContentProps
) {
    const [local, rest] = splitProps(
        mergeProps({ alt: "" }, props),
        [
            "src",
            "class",
            "className",
            "onLoad",
            "onError",
            "alt",
            "style",
        ]
    )
    const context = useContext(ImageContext)
    const [failed, setFailed] = createSignal(false)
    createEffect(() => {
        local.src
        context.setLoaded(false)
        setFailed(false)
    })
    return (
        <Show when={local.src}>
            <img
                {...rest}
                src={local.src}
                alt={local.alt}
                class={cn(
                    "absolute inset-0 size-full object-cover",
                    local.class,
                    local.className
                )}
                style={
                    typeof local.style === "string"
                        ? `${local.style};${failed() ? "visibility:hidden" : ""}`
                        : {
                              ...local.style,
                              visibility: failed()
                                  ? "hidden"
                                  : local.style?.visibility,
                          }
                }
                onLoad={(event) => {
                    context.setLoaded(true)
                    setFailed(false)
                    callHandler(local.onLoad, event)
                }}
                onError={(event) => {
                    context.setLoaded(false)
                    setFailed(true)
                    callHandler(local.onError, event)
                }}
            />
        </Show>
    )
}
export function ProfileImageFallback(
    props: ProfileImageProps
) {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    const context = useContext(ImageContext)
    return (
        <Show when={!context.loaded()}>
            <span
                {...rest}
                class={cn(
                    "text-footnote font-medium",
                    local.class,
                    local.className
                )}
            />
        </Show>
    )
}
