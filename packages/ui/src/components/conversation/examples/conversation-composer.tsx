import { Conversation } from "@passui/react/conversation"
import { useState } from "react"

export function ConversationComposer() {
    const [sent, setSent] = useState<string[]>([])

    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <ul className="m-0 flex list-none flex-col gap-1 p-0 text-footnote text-label-secondary">
                {sent.length === 0 ? (
                    <li>
                        Type a reply, then press Send or
                        Ctrl/Cmd+Enter.
                    </li>
                ) : (
                    sent.map((body, index) => (
                        <li key={index}>Sent: {body}</li>
                    ))
                )}
            </ul>
            <Conversation.Composer
                placeholder="Write a reply"
                maxLength={280}
                sendLabel="Send"
                remaining={(count) => `${count} left`}
                onSend={async (body) => {
                    // the field clears only once this resolves
                    await new Promise((resolve) =>
                        setTimeout(resolve, 400)
                    )
                    setSent((current) => [...current, body])
                }}
            />
        </div>
    )
}
