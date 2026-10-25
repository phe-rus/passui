import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { TextEditor } from "@passui/react/text-editor"
import { useId, useState } from "react"

export function TextEditorComment() {
    const commentId = useId()
    const [comment, setComment] = useState("")

    return (
        <div className="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <label
                htmlFor={commentId}
                className="text-subheadline font-semibold"
            >
                Add a comment
            </label>
            <TextEditor
                id={commentId}
                placeholder="Share your thoughts"
                value={comment}
                onChange={(event) =>
                    setComment(event.target.value)
                }
            />
            <div className="flex justify-end gap-2">
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setComment("")}
                >
                    Cancel
                </Button>
                <Button
                    variant="accent"
                    size="sm"
                    disabled={!comment.trim()}
                    onClick={() => {
                        setComment("")
                        toast.success("Comment posted")
                    }}
                >
                    Post
                </Button>
            </div>
        </div>
    )
}
