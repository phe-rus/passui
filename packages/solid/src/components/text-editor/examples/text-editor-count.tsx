import { createSignal } from "solid-js"
import { TextEditor } from "@passui/solid/text-editor"

export function TextEditorCount() {
    const [status, setStatus] = createSignal(
        "Out hiking until Sunday."
    )
    return (
        <div class="flex w-full max-w-sm flex-col gap-2">
            <label
                for="solid-status-editor"
                class="text-subheadline font-semibold"
            >
                Status
            </label>
            <TextEditor
                id="solid-status-editor"
                maxLength={160}
                value={status()}
                aria-describedby="solid-status-count"
                onInput={(event) =>
                    setStatus(event.currentTarget.value)
                }
            />
            <output
                id="solid-status-count"
                class="self-end text-caption text-label-tertiary tabular-nums"
            >
                {status().length} / 160
            </output>
        </div>
    )
}
