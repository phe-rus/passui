import { createContext, useContext, useEffect, useState, type ComponentProps } from "react"
import { cn } from "../../lib/class-names"

export type ProfileImageSize = "sm" | "md" | "lg"

const diameters: Record<ProfileImageSize, string> = {
    sm: "size-7",
    md: "size-9",
    lg: "size-12",
}

const fallbackTextSizes: Record<ProfileImageSize, string> = {
    sm: "text-caption",
    md: "text-footnote",
    lg: "text-subheadline",
}

const ImageContext = createContext<{
    loaded: boolean
    setLoaded: (loaded: boolean) => void
    size: ProfileImageSize
}>({ loaded: false, setLoaded: () => {}, size: "md" })

export interface ProfileImageProps extends ComponentProps<"span"> {
    /** Avatar diameter; fallback initials scale with it. @default "md" */
    size?: ProfileImageSize
}

export function ProfileImage({ size = "md", className, ...props }: ProfileImageProps) {
    const [loaded, setLoaded] = useState(false)
    return (
        <ImageContext value={{ loaded, setLoaded, size }}>
            <span
                {...props}
                className={cn(
                    "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-fill text-label-secondary",
                    diameters[size],
                    className
                )}
            />
        </ImageContext>
    )
}
export function ProfileImageContent({
    src,
    className,
    onLoad,
    onError,
    ...props
}: ComponentProps<"img">) {
    const { setLoaded } = useContext(ImageContext)
    useEffect(() => {
        if (src) setLoaded(false)
    }, [src, setLoaded])
    if (!src) return null
    return (
        <img
            key={src}
            alt=""
            {...props}
            src={src}
            className={cn("absolute inset-0 size-full object-cover", className)}
            onLoad={(event) => {
                setLoaded(true)
                onLoad?.(event)
            }}
            onError={(event) => {
                setLoaded(false)
                onError?.(event)
                event.currentTarget.style.visibility = "hidden"
            }}
        />
    )
}
export function ProfileImageFallback({ className, ...props }: ComponentProps<"span">) {
    const { loaded, size } = useContext(ImageContext)
    return loaded ? null : (
        <span {...props} className={cn(fallbackTextSizes[size], "font-medium", className)} />
    )
}
