import { createSignal } from "solid-js"
import { Conversation } from "@passui/solid/conversation"

export function ConversationComposer() {
    const [messages, setMessages] = createSignal([
        {
            id: "1",
            author: "Aiko",
            body: "How does the preview look?",
            mine: false,
            createdAt: "2026-10-26T10:00:00Z",
        },
    ])
    return (
        <div class="w-full max-w-md">
            <Conversation.Messages
                messages={messages()}
                locale="en-GB"
            />
            <Conversation.Composer
                placeholder="Reply to Aiko"
                sendLabel="Send"
                maxLength={280}
                onSend={async (body) =>
                    setMessages((items) => [
                        ...items,
                        {
                            id: String(items.length + 1),
                            author: "You",
                            body,
                            mine: true,
                            createdAt:
                                new Date().toISOString(),
                        },
                    ])
                }
            />
        </div>
    )
}
