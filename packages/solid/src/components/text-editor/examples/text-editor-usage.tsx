import { createSignal, createUniqueId } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"

export function TextEditorUsage() {
    const bioId = createUniqueId()
    const [bio, setBio] = createSignal("")
    return (
        <div class="flex w-full max-w-sm flex-col gap-2">
            <label
                for={bioId}
                class="text-subheadline font-semibold"
            >
                Bio
            </label>
            <TextEditor
                id={bioId}
                value={bio()}
                onInput={(event) =>
                    setBio(event.currentTarget.value)
                }
                placeholder="A few words about you"
            />
        </div>
    )
}
