import { createContext, useContext, useEffect, useState, type ComponentProps } from "react"
import { cn } from "../../lib/class-names"

const ImageContext = createContext<{
    loaded: boolean
    setLoaded: (loaded: boolean) => void
}>({ loaded: false, setLoaded: () => {} })
export function ProfileImage({ className, ...props }: ComponentProps<"span">) {
    const [loaded, setLoaded] = useState(false)
    return (
        <ImageContext value={{ loaded, setLoaded }}>
            <span
                {...props}
                className={cn(
                    "relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-fill text-label-secondary",
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
    const { loaded } = useContext(ImageContext)
    return loaded ? null : (
        <span {...props} className={cn("text-footnote font-medium", className)} />
    )
}
