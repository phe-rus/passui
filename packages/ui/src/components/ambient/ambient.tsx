import type { ComponentPropsWithoutRef } from "react"
import { cn } from "../../lib/class-names"

type AmbientProps = ComponentPropsWithoutRef<"section"> & {
    /** The image whose colors glow behind the content. */
    src?: string | null
}

/**
 * Content with its image's colors glowing softly behind it, no card or
 * edge: a blown-up, blurred copy of the image masked into a circle that
 * fades into the page, the way Apple lets a photo light its surroundings.
 */
export function Ambient({ src, className, children, ...props }: AmbientProps) {
    return (
        <section className={cn("relative isolate", className)} {...props}>
            {src && (
                <img
                    aria-hidden
                    src={src}
                    alt=""
                    className={cn(
                        "pointer-events-none absolute top-[38%] left-1/2 -z-10 size-[min(32rem,100vw)] -translate-x-1/2 -translate-y-1/2",
                        "rounded-full object-cover opacity-20 blur-3xl",
                        // on a dark page the same light blooms far wider, so it shrinks and dims
                        "dark:size-[min(20rem,80vw)] dark:opacity-15 dark:blur-2xl",
                        "mask-[radial-gradient(closest-side,black_35%,transparent)]",
                        "animate-in fade-in-0 zoom-in-90 duration-1000"
                    )}
                />
            )}
            {children}
        </section>
    )
}
