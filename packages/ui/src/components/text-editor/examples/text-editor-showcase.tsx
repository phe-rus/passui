import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { TextEditor } from "@passui/react/text-editor"
import { TextField } from "@passui/react/text-field"
import { useId, useState } from "react"

export function TextEditorShowcase() {
    const messageId = useId()
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")

    return (
        <form
            className="flex w-full max-w-sm flex-col gap-4 rounded-4xl bg-elevated p-6 shadow-sm ring-1 ring-separator/60"
            onSubmit={(event) => {
                event.preventDefault()
                toast.success("Thanks, we got your message")
                setSubject("")
                setMessage("")
            }}
        >
            <h2 className="text-headline font-semibold text-label">
                Contact support
            </h2>
            <TextField
                label="Subject"
                placeholder="I can't sign in on my tablet"
                value={subject}
                onChange={(event) =>
                    setSubject(event.target.value)
                }
            />
            <div className="flex flex-col gap-2">
                <label
                    htmlFor={messageId}
                    className="text-subheadline font-semibold"
                >
                    Message
                </label>
                <TextEditor
                    id={messageId}
                    placeholder="What happened, and what did you expect?"
                    value={message}
                    onChange={(event) =>
                        setMessage(event.target.value)
                    }
                />
            </div>
            <Button
                type="submit"
                variant="accent"
                disabled={!subject || !message}
            >
                Send
            </Button>
        </form>
    )
}
