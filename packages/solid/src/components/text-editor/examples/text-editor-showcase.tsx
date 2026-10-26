import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { TextEditor } from "@passui/solid/text-editor"
import { TextField } from "@passui/solid/text-field"
import { toast } from "@passui/solid/toast"

export function TextEditorShowcase() {
    const [subject, setSubject] = createSignal("")
    const [message, setMessage] = createSignal("")
    return (
        <form
            class="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Thanks, we got your message")
                setSubject("")
                setMessage("")
            }}
        >
            <h2 class="text-headline font-semibold text-label">
                Contact support
            </h2>
            <TextField
                label="Subject"
                placeholder="I can't sign in on my tablet"
                value={subject()}
                onInput={(event) =>
                    setSubject(event.currentTarget.value)
                }
            />
            <div class="flex flex-col gap-2">
                <label
                    for="solid-contact-message"
                    class="text-subheadline font-semibold"
                >
                    Message
                </label>
                <TextEditor
                    id="solid-contact-message"
                    placeholder="What happened, and what did you expect?"
                    value={message()}
                    onInput={(event) =>
                        setMessage(event.currentTarget.value)
                    }
                />
            </div>
            <Button
                type="submit"
                variant="accent"
                disabled={!subject() || !message()}
            >
                Send
            </Button>
        </form>
    )
}
