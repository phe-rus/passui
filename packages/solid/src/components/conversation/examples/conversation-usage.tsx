import { createSignal } from "solid-js"
import { Conversation } from "@passui/solid/conversation"
export function ConversationUsage() {
    const [messages, setMessages] = createSignal([
        {
            id: "1",
            body: "Ready to start?",
            mine: false,
            author: "Aiko",
            createdAt: "2026-10-25T09:00:00Z",
        },
    ])
    return (
        <div class="w-full max-w-md">
            <Conversation.Messages
                messages={messages()}
                locale="en-GB"
            />
            <Conversation.Composer
                placeholder="Write a reply"
                sendLabel="Send reply"
                maxLength={500}
                onSend={async (body) => {
                    setMessages((items) => [
                        ...items,
                        {
                            id: String(items.length + 1),
                            body,
                            mine: true,
                            author: "You",
                            createdAt:
                                new Date().toISOString(),
                        },
                    ])
                }}
            />
        </div>
    )
}
