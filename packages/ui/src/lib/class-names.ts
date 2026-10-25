import { clsx } from "clsx"
import type { ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"
import { textStyles } from "@passui/tokens/typography"

const textStyleClasses = Object.keys(textStyles).map(
    (name) =>
        `text-${name.replace(/[A-Z]/g, (character) => `-${character.toLowerCase()}`)}`
)

const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            "font-size": textStyleClasses,
        },
    },
})

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
