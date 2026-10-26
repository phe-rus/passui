/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"

export function TextEditorUsage() {
    const [value, setValue] = createSignal("")
    return (
        <div class="flex w-full max-w-sm flex-col gap-2">
            <TextEditor
                aria-label="Message"
                value={value()}
                onInput={(event) =>
                    setValue(event.currentTarget.value)
                }
                placeholder="Write a message"
            />
            <output>{value().length} characters</output>
        </div>
    )
}
