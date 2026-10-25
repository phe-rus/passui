import { ChipInRows } from "./examples/chip-in-rows"
import { defineDocs } from "../../docs/types"
import { Chip, type ChipTone } from "./chip"
import { ChipShowcase } from "./examples/chip-showcase"
import { ChipTones } from "./examples/chip-tones"
import { ChipUsage } from "./examples/chip-usage"

type ChipProps = { tone?: ChipTone; children?: string }

export const chipDocs = defineDocs<ChipProps>()({
    slug: "chip",
    name: "Chip",
    importPath: "@passui/react",
    controls: {
        tone: {
            kind: "select",
            options: {
                neutral: true,
                accent: true,
                public: true,
                family: true,
                friends: true,
            },
            default: "neutral",
        },
        children: { kind: "text", default: "Draft" },
    },
    render: ({ children, ...values }) => (
        <Chip {...values}>{children}</Chip>
    ),
    usage: ChipUsage,
    showcase: ChipShowcase,
    examples: [
        { id: "tones", component: ChipTones },
        { id: "in-rows", component: ChipInRows },
    ],
})
