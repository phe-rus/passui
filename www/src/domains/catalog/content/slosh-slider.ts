import type { sloshSliderDocs } from "../definitions"
import type { ComponentContent } from "../types"
export const sloshSliderContent: ComponentContent<typeof sloshSliderDocs> = {
    summary: "A rigid handle with a spring-following liquid fill and a subtle meniscus.",
    usage: "Use a controlled value and onChange for application state, or defaultValue for an independent control. Values run from 0 to 100. Motion stops at rest and follows Reduce Motion.",
    propDescriptions: {
        label: "Localized accessible name.",
        viscosity: "Adjusts the viscosity of the native control.",
        momentum: "Adjusts the momentum of the native control.",
        tilt: "Adjusts the tilt of the native control.",
    },
    examples: {
        rigid: {
            title: "Rigid",
            description: "Use the same native control with a different interaction setting.",
        },
        disabled: {
            title: "Disabled",
            description: "An unavailable state that keeps its label and value.",
        },
    },
    anatomy: [
        {
            element: "Track and motion",
            description:
                "A rigid handle with a spring-following liquid fill and a subtle meniscus.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Give the control a localized label and meaningful formatValue for units such as time.",
        },
    ],
    accessibility: [
        "Arrow keys adjust the value; Shift makes larger steps. Home and End reach the bounds. Reduced motion removes the liquid or wake effect.",
    ],
}
