import { Conversation } from "@passui/react/conversation"

const hoursAgo = (hours: number) =>
    new Date(Date.now() - hours * 3_600_000).toISOString()

export function ConversationDays() {
    return (
        <div className="w-full max-w-sm rounded-4xl bg-elevated p-4 shadow-sm ring-1 ring-separator/60">
            <Conversation.Messages
                messages={[
                    {
                        id: "1",
                        mine: false,
                        author: "Mira",
                        body: "Did the release go out?",
                        createdAt: hoursAgo(26),
                    },
                    {
                        id: "2",
                        mine: true,
                        body: "Not yet, tomorrow morning.",
                        createdAt: hoursAgo(25.9),
                    },
                    {
                        id: "3",
                        mine: true,
                        body: "It's live!",
                        createdAt: hoursAgo(1),
                    },
                    {
                        id: "4",
                        mine: false,
                        author: "Mira",
                        body: "Amazing, well done.",
                        createdAt: hoursAgo(0.9),
                    },
                    {
                        id: "5",
                        mine: false,
                        author: "Mira",
                        body: "Celebrating at lunch?",
                        createdAt: hoursAgo(0.88),
                    },
                ]}
            />
        </div>
    )
}
