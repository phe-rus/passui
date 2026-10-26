import { createSignal } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"
import { Button } from "@passui/solid/button"

export function TextEditorComment() {
    const [comment, setComment] = createSignal("")
    const [posted, setPosted] = createSignal("")
    return (
        <div class="grid w-full max-w-sm gap-3">
            <TextEditor
                aria-label="Comment"
                value={comment()}
                onInput={(event) =>
                    setComment(event.currentTarget.value)
                }
                placeholder="Write a comment"
            />
            <Button
                disabled={!comment().trim()}
                onClick={() => {
                    setPosted(comment())
                    setComment("")
                }}
            >
                Post comment
            </Button>
            <output class="text-footnote text-label-secondary">
                {posted() && `Posted: ${posted()}`}
            </output>
        </div>
    )
}
