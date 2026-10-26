import { Conversation } from "@passui/solid/conversation"

export function ConversationDays() {
    return (
        <div class="w-full max-w-md">
            <Conversation.Messages
                locale="en-GB"
                messages={[
                    {
                        id: "1",
                        author: "Nora",
                        body: "I'll send the update tomorrow.",
                        mine: false,
                        createdAt: "2026-10-24T15:30:00Z",
                    },
                    {
                        id: "2",
                        author: "You",
                        body: "Thanks, sounds good.",
                        mine: true,
                        createdAt: "2026-10-24T15:31:00Z",
                    },
                    {
                        id: "3",
                        author: "Nora",
                        body: "The update is ready!",
                        mine: false,
                        createdAt: "2026-10-26T08:30:00Z",
                    },
                ]}
            />
        </div>
    )
}
