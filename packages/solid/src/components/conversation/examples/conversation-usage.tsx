import { Conversation } from "@passui/solid/conversation"
const minutesAgo = (minutes: number) =>
    new Date(Date.now() - minutes * 60_000).toISOString()
export function ConversationUsage() {
    return (
        <div class="w-full max-w-sm">
            <Conversation.Messages
                messages={[
                    {
                        id: "1",
                        mine: false,
                        author: "Kenji",
                        body: "Are we still on for lunch?",
                        createdAt: minutesAgo(4),
                    },
                    {
                        id: "2",
                        mine: true,
                        body: "Yes! 12:30 at the usual place.",
                        createdAt: minutesAgo(2),
                    },
                ]}
            />
        </div>
    )
}
