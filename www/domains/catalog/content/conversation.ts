import type { conversationDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const conversationContent: ComponentContent<
    typeof conversationDocs
> = {
    summary:
        "A thread of messages like Messages on iPhone, and a reply field with a round Send button.",
    usage: "Use Conversation.Messages for a thread between the reader and someone else, such as a support request, and Conversation.Composer to reply.",
    propDescriptions: {
        author: "Each message's author: shown once above a run of messages from the other side.",
        avatar: "Each message's avatar: shown beside the last of a run of messages from the other side.",
    },
    examples: {
        composer: {
            title: "Composer",
            description:
                "Send with the button or Ctrl/Cmd+Enter. The field clears only after onSend resolves, so a failed send keeps the text. Near the limit, remaining words the count.",
        },
        days: {
            title: "Across days",
            description:
                "A day line when the date changes, and messages a few minutes apart grouped under one name.",
        },
    },
    anatomy: [
        {
            element: "Conversation.Messages",
            description:
                "The thread. A day line appears when the date changes, and messages within five minutes are grouped.",
            required: true,
        },
        {
            element: "Message bubble",
            description:
                "Plain text. Yours on the right in the strong color, theirs on the left.",
            required: true,
        },
        {
            element: "Conversation.Composer",
            description:
                "A field that grows as you type, with a Send button and room for actions under it.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Pass createdAt as an ISO string, so the day line and grouping work.",
        },
        {
            kind: "do",
            text: "Pass translated words for sendLabel and remaining. Passui has no text of its own; day names come from Intl.",
        },
        {
            kind: "dont",
            text: "Put markup in a message body. It's always shown as plain text.",
        },
    ],
    accessibility: [
        "The thread is an ordered list, and each time is a time element with a machine-readable dateTime.",
        "The Send button is labelled by sendLabel and stays disabled until there's text to send.",
        "Day lines and times use the reader's time zone, so they render in the browser rather than on the server.",
    ],
}
