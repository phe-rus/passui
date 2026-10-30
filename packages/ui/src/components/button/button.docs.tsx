import { ChevronRightIcon } from "../../icons/icons"
import { jsxText } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { Button, type ButtonProps } from "./button"
import type { ButtonSize } from "./button-styles"
import { ButtonDisabled } from "./examples/button-disabled"
import { ButtonIcon } from "./examples/button-icon"
import { ButtonLink } from "./examples/button-link"
import { ButtonPending } from "./examples/button-pending"
import { ButtonShowcase } from "./examples/button-showcase"
import { ButtonSizes } from "./examples/button-sizes"
import { ButtonUsage } from "./examples/button-usage"
import { ButtonVariants } from "./examples/button-variants"
import { ButtonWithIcon } from "./examples/button-with-icon"

// Sample values only: the site writes all of the docs' prose.
const sampleLabel = "Continue"

const iconSizes = new Set<ButtonSize>([
    "icon",
    "icon-xs",
    "icon-sm",
    "icon-lg",
    "icon-full",
])

export const buttonDocs = defineDocs<ButtonProps>()({
    slug: "button",
    name: "Button",
    importPath: "@passui/react/button",
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
            default: "default",
        },
        size: {
            kind: "select",
            options: {
                default: true,
                xs: true,
                sm: true,
                lg: true,
                icon: true,
                "icon-xs": true,
                "icon-sm": true,
                "icon-lg": true,
                "icon-full": true,
            },
            default: "default",
        },
        isPending: { kind: "boolean", default: false },
        disabled: { kind: "boolean", default: false },
        children: { kind: "text", default: sampleLabel },
    },
    render: ({ children, size, ...props }) =>
        iconSizes.has(size) ? (
            <Button
                {...props}
                size={size}
                aria-label={children}
            >
                <ChevronRightIcon />
            </Button>
        ) : (
            <Button {...props} size={size}>
                {children}
            </Button>
        ),
    childrenSnippet: ({ children, size }) =>
        iconSizes.has(size)
            ? {
                  imports: [
                      'import { ChevronRightIcon } from "@passui/react/icons"',
                  ],
                  children: "<ChevronRightIcon />",
                  extraProps: { "aria-label": children },
              }
            : { imports: [], children: jsxText(children) },
    usage: ButtonUsage,
    showcase: ButtonShowcase,
    examples: [
        { id: "variants", component: ButtonVariants },
        { id: "sizes", component: ButtonSizes },
        { id: "with-icon", component: ButtonWithIcon },
        { id: "icon", component: ButtonIcon },
        {
            id: "pending",
            component: ButtonPending,
            playground: {
                variant: "accent",
                isPending: true,
            },
        },
        {
            id: "disabled",
            component: ButtonDisabled,
            playground: { disabled: true },
        },
        { id: "link", component: ButtonLink },
    ],
})
