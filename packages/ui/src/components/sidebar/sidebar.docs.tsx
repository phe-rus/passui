import {
    InboxIcon,
    SendIcon,
    StarIcon,
} from "@passui/react/icons"
import { SidebarUnread } from "./examples/sidebar-unread"

import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { SidebarGroups } from "./examples/sidebar-groups"
import { SidebarShowcase } from "./examples/sidebar-showcase"
import { SidebarUsage } from "./examples/sidebar-usage"
import {
    SidebarItemContent,
    SidebarSection,
    sidebarItemClass,
} from "./sidebar"

// Rows are the app's own links dressed by sidebarItemClass and
// SidebarItemContent, so the playground switches counts on and the
// snippet writes the rows.
type DemoProps = {
    title: string
    counts: boolean
}

const items = [
    {
        id: "inbox",
        label: "Inbox",
        icon: InboxIcon,
        count: 12,
    },
    {
        id: "starred",
        label: "Starred",
        icon: StarIcon,
        count: 3,
    },
    { id: "sent", label: "Sent", icon: SendIcon, count: 0 },
]

function SidebarDemo({ title, counts }: DemoProps) {
    const [active, setActive] = useState("inbox")
    return (
        <nav aria-label="Mail" className="w-56">
            <SidebarSection title={title}>
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        aria-current={
                            item.id === active
                                ? "page"
                                : undefined
                        }
                        className={sidebarItemClass(
                            item.id === active
                        )}
                        onClick={(event) => {
                            event.preventDefault()
                            setActive(item.id)
                        }}
                    >
                        <SidebarItemContent
                            active={item.id === active}
                            count={
                                counts
                                    ? item.count
                                    : undefined
                            }
                            icon={<item.icon size={18} />}
                        >
                            {item.label}
                        </SidebarItemContent>
                    </a>
                ))}
            </SidebarSection>
        </nav>
    )
}

export const sidebarDocs = defineDocs<DemoProps>()({
    slug: "sidebar",
    name: "SidebarSection",
    importPath: "@passui/react/sidebar",
    controls: {
        title: {
            kind: "text",
            default: "Mailboxes",
            required: true,
        },
        counts: { kind: "boolean", default: true },
    },
    render: (values) => <SidebarDemo {...values} />,
    childrenSnippet: ({ counts }) => ({
        imports: [
            'import { InboxIcon } from "@passui/react/icons"',
            'import { SidebarItemContent, sidebarItemClass } from "@passui/react/sidebar"',
            'import { Link } from "@tanstack/react-router"',
        ],
        omit: ["counts"],
        children: [
            "",
            '    <Link to="/inbox">',
            "        {({ isActive }) => (",
            "            <span className={sidebarItemClass(isActive)}>",
            "                <SidebarItemContent",
            "                    active={isActive}",
            ...(counts
                ? ["                    count={12}"]
                : []),
            "                    icon={<InboxIcon size={18} />}",
            "                >",
            "                    Inbox",
            "                </SidebarItemContent>",
            "            </span>",
            "        )}",
            "    </Link>",
            "",
        ].join("\n"),
    }),
    usage: SidebarUsage,
    showcase: SidebarShowcase,
    examples: [
        { id: "groups", component: SidebarGroups },
        { id: "unread", component: SidebarUnread },
    ],
})
