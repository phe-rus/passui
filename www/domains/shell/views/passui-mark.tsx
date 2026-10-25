import { cn } from "@passui/react/cn"

type PassuiMarkProps = {
    className?: string
    /** Lets the sun rise into place once, on first paint. */
    animated?: boolean
}

/**
 * The Passui mark: the sun in Blush. The brand colour stays
 * fixed whatever accent the page wears; dark mode uses the soft Blush.
 */
export function PassuiMark({
    className,
    animated,
}: PassuiMarkProps) {
    return (
        <svg
            viewBox="0 0 32 32"
            aria-hidden="true"
            className={cn("size-7 shrink-0", className)}
        >
            <circle
                cx="16"
                cy="16"
                r="15"
                className={cn(
                    "fill-[#d16988] [@media(prefers-color-scheme:dark)]:fill-[#e8b4bb]",
                    animated &&
                        "animate-[sunrise_1.4s_cubic-bezier(0.22,1,0.36,1)_both] motion-reduce:animate-none"
                )}
            />
        </svg>
    )
}
