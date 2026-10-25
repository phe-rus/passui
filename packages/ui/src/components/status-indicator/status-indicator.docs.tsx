import { StatusIndicatorLive } from "./examples/status-indicator-live"
import { StatusIndicatorStates } from "./examples/status-indicator-states"
import { defineDocs } from "../../docs/types"
import { StatusIndicatorShowcase } from "./examples/status-indicator-showcase"
import { StatusIndicatorUsage } from "./examples/status-indicator-usage"
import { StatusIndicator } from "./status-indicator"

type DemoProps = {
    state: "saved" | "syncing" | "offline"
    children?: string
}

export const statusIndicatorDocs = defineDocs<DemoProps>()({
    slug: "status-indicator",
    name: "StatusIndicator",
    importPath: "@passui/react",
    controls: {
        state: {
            kind: "select",
            options: {
                saved: true,
                syncing: true,
                offline: true,
            },
            default: "saved",
        },
        children: {
            kind: "text",
            default: "All changes saved",
        },
    },
    render: ({ children, ...values }) => (
        <StatusIndicator {...values}>
            {children}
        </StatusIndicator>
    ),
    usage: StatusIndicatorUsage,
    showcase: StatusIndicatorShowcase,
    examples: [
        { id: "states", component: StatusIndicatorStates },
        { id: "live", component: StatusIndicatorLive },
    ],
})
