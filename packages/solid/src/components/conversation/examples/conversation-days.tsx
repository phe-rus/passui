import { Conversation } from "@passui/solid/conversation"

const hoursAgo = (hours: number) =>
    new Date(Date.now() - hours * 3_600_000).toISOString()

export function ConversationDays() {
    return (
        <div class="w-full max-w-sm rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Conversation.Messages
                messages={[
                    {
                        id: "1",
                        author: "Mira",
                        body: "Did the release go out?",
                        mine: false,
                        createdAt: hoursAgo(26),
                    },
                    {
                        id: "2",
                        body: "Not yet, tomorrow morning.",
                        mine: true,
                        createdAt: hoursAgo(25.9),
                    },
                    {
                        id: "3",
                        body: "It's live!",
                        mine: true,
                        createdAt: hoursAgo(1),
                    },
                    {
                        id: "4",
                        author: "Mira",
                        body: "Amazing, well done.",
                        mine: false,
                        createdAt: hoursAgo(0.9),
                    },
                    {
                        id: "5",
                        author: "Mira",
                        body: "Celebrating at lunch?",
                        mine: false,
                        createdAt: hoursAgo(0.88),
                    },
                ]}
            />
        </div>
    )
}
