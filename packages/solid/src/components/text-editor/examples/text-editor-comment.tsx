import { createSignal, createUniqueId } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"
import { Button } from "@passui/solid/button"
import { toast } from "@passui/solid/toast"

export function TextEditorComment() {
    const commentId = createUniqueId()
    const [comment, setComment] = createSignal("")
    return (
        <div class="flex w-full max-w-sm flex-col gap-3 rounded-4xl bg-elevated p-5 shadow-sm ring-1 ring-separator/60">
            <label
                for={commentId}
                class="text-subheadline font-semibold"
            >
                Add a comment
            </label>
            <TextEditor
                id={commentId}
                value={comment()}
                onInput={(event) =>
                    setComment(event.currentTarget.value)
                }
                placeholder="Share your thoughts"
            />
            <div class="flex justify-end gap-2">
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
                    disabled={!comment().trim()}
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
