import { createSignal } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"

export function TextEditorCount() {
    const [text, setText] = createSignal("")
    return (
        <div class="grid w-full max-w-sm gap-2">
            <TextEditor
                aria-label="Bio"
                maxLength={160}
                value={text()}
                onInput={(event) =>
                    setText(event.currentTarget.value)
                }
                placeholder="Tell people about yourself"
            />
            <output class="text-right text-footnote text-label-secondary">
                {text().length} / 160
            </output>
        </div>
    )
}
