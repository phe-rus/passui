import { Settings02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { defineDocs } from "../../docs/types"
import { IconButtonPlayer } from "./examples/icon-button-player"
import { IconButtonShowcase } from "./examples/icon-button-showcase"
import { IconButtonUsage } from "./examples/icon-button-usage"
import { IconButtonVariants } from "./examples/icon-button-variants"
import {
    IconButton,
    type IconButtonProps,
} from "./icon-button"

export const iconButtonDocs = defineDocs<IconButtonProps>()({
    slug: "icon-button",
    name: "IconButton",
    importPath: "@passui/react/icon-button",
    controls: {
        variant: {
            kind: "select",
            options: {
                default: true,
                secondary: true,
                outline: true,
                ghost: true,
                link: true,
                accent: true,
                destructive: true,
            },
            default: "ghost",
        },
        size: {
            kind: "select",
            options: {
                icon: true,
                "icon-xs": true,
                "icon-sm": true,
                "icon-lg": true,
            },
            default: "icon",
        },
        isPending: { kind: "boolean", default: false },
        disabled: { kind: "boolean", default: false },
        label: {
            kind: "text",
            default: "Settings",
            required: true,
        },
    },
    render: (values) => (
        <IconButton {...values}>
            <HugeiconsIcon icon={Settings02Icon} size={20} />
        </IconButton>
    ),
    childrenSnippet: () => ({
        imports: [
            'import { Settings02Icon } from "@hugeicons/core-free-icons"',
            'import { HugeiconsIcon } from "@hugeicons/react"',
        ],
        children:
            "<HugeiconsIcon icon={Settings02Icon} size={20} />",
    }),
    usage: IconButtonUsage,
    showcase: IconButtonShowcase,
    examples: [
        { id: "variants", component: IconButtonVariants },
        { id: "player", component: IconButtonPlayer },
    ],
})
