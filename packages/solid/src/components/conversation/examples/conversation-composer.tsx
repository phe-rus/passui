import { createSignal, For, Show } from "solid-js"
import { Conversation } from "@passui/solid/conversation"

export function ConversationComposer() {
    const [sent, setSent] = createSignal<string[]>([])
    return (
        <div class="flex w-full max-w-sm flex-col gap-3">
            <ul class="m-0 flex list-none flex-col gap-1 p-0 text-footnote text-label-secondary">
                <Show
                    when={sent().length}
                    fallback={
                        <li>
                            Type a reply, then press Send or
                            Ctrl/Cmd+Enter.
                        </li>
                    }
                >
                    <For each={sent()}>
                        {(body) => <li>Sent: {body}</li>}
                    </For>
                </Show>
            </ul>
            <Conversation.Composer
                placeholder="Write a reply"
                sendLabel="Send"
                maxLength={280}
                remaining={(count) => `${count} left`}
                onSend={async (body) => {
                    await new Promise((resolve) =>
                        setTimeout(resolve, 400)
                    )
                    setSent((current) => [...current, body])
                }}
            />
        </div>
    )
}
