import { ConversationDays } from "./examples/conversation-days"
import { CustomerSupportIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { defineDocs } from "../../docs/types"
import { Conversation } from "./conversation"
import { ConversationComposer } from "./examples/conversation-composer"
import { ConversationShowcase } from "./examples/conversation-showcase"
import { ConversationUsage } from "./examples/conversation-usage"

// Conversation is two parts; the playground shows Messages, with the
// other side's name and avatar switched on and off.
type DemoProps = {
    author: string
    avatar: boolean
}

const minutesAgo = (minutes: number) =>
    new Date(Date.now() - minutes * 60_000).toISOString()

export const conversationDocs = defineDocs<DemoProps>()({
    slug: "conversation",
    name: "Conversation",
    importPath: "@passui/react/conversation",
    controls: {
        author: { kind: "text", default: "Support" },
        avatar: { kind: "boolean", default: true },
    },
    render: ({ author, avatar }) => {
        const them = {
            mine: false,
            author: author || undefined,
            avatar: avatar ? (
                <span className="flex size-7 items-center justify-center rounded-full bg-accent-soft text-accent-text">
                    <HugeiconsIcon
                        icon={CustomerSupportIcon}
                        size={16}
                    />
                </span>
            ) : undefined,
        }
        return (
            <div className="w-full max-w-sm">
                <Conversation.Messages
                    messages={[
                        {
                            id: "1",
                            mine: true,
                            body: "I can't sign in on my new phone.",
                            createdAt: minutesAgo(9),
                        },
                        {
                            id: "2",
                            ...them,
                            body: "Sorry about that! Did you set up a passkey on your old one?",
                            createdAt: minutesAgo(7),
                        },
                        {
                            id: "3",
                            ...them,
                            body: "If so, you can use it from your new phone by scanning the code.",
                            createdAt: minutesAgo(7),
                        },
                    ]}
                />
            </div>
        )
    },
    childrenSnippet: ({ author, avatar }) => ({
        imports: avatar
            ? [
                  'import { CustomerSupportIcon } from "@hugeicons/core-free-icons"',
                  'import { HugeiconsIcon } from "@hugeicons/react"',
              ]
            : [],
        element: "Conversation.Messages",
        omit: ["author", "avatar"],
        expressionProps: {
            messages: `[\n        { id: "1", mine: true, body: "Hi!", createdAt: "2026-10-14T09:00:00Z" },\n        { id: "2", mine: false, body: "Hello, how can we help?"${author ? `, author: ${JSON.stringify(author)}` : ""}${avatar ? ", avatar: <HugeiconsIcon icon={CustomerSupportIcon} size={16} />" : ""}, createdAt: "2026-10-14T09:01:00Z" },\n    ]`,
        },
        children: "",
    }),
    usage: ConversationUsage,
    showcase: ConversationShowcase,
    examples: [
        { id: "composer", component: ConversationComposer },
        { id: "days", component: ConversationDays },
    ],
})
