import { TextEditor } from "@passui/react/text-editor"
import { useId, useState } from "react"

const limit = 160

export function TextEditorCount() {
    const statusId = useId()
    const [status, setStatus] = useState(
        "Out hiking until Sunday."
    )
    const countId = useId()

    return (
        <div className="flex w-full max-w-sm flex-col gap-2">
            <label
                htmlFor={statusId}
                className="text-subheadline font-semibold"
            >
                Status
            </label>
            <TextEditor
                id={statusId}
                maxLength={limit}
                aria-describedby={countId}
                value={status}
                onChange={(event) =>
                    setStatus(event.target.value)
                }
            />
            <span
                id={countId}
                className="self-end text-caption text-label-tertiary tabular-nums"
            >
                {status.length} / {limit}
            </span>
        </div>
    )
}
