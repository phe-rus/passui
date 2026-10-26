import { createSignal } from "solid-js"
import { Conversation } from "@passui/solid/conversation"

const minutesAgo = (minutes: number) =>
    new Date(Date.now() - minutes * 60_000).toISOString()
const support = {
    mine: false,
    author: "Pass support",
    avatar: (
        <span class="flex size-7 items-center justify-center rounded-full bg-accent-soft text-accent-text">
            ☏
        </span>
    ),
}

export function ConversationShowcase() {
    const [messages, setMessages] = createSignal([
        {
            id: "1",
            mine: true,
            body: "Hi, I lost my phone and can't get my sign-in codes.",
            createdAt: minutesAgo(26),
        },
        {
            id: "2",
            ...support,
            body: "We can help. Do you still have your recovery key?",
            createdAt: minutesAgo(24),
        },
        {
            id: "3",
            ...support,
            body: "It's the 24-letter key you saved when you turned on two-step verification.",
            createdAt: minutesAgo(24),
        },
    ])
    return (
        <div class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Conversation.Messages messages={messages()} />
            <Conversation.Composer
                placeholder="Write a reply"
                maxLength={500}
                sendLabel="Send"
                onSend={async (body) =>
                    setMessages((current) => [
                        ...current,
                        {
                            id: String(current.length + 1),
                            mine: true,
                            body,
                            createdAt:
                                new Date().toISOString(),
                        },
                    ])
                }
            />
        </div>
    )
}
