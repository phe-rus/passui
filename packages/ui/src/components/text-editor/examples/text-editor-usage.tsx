import { TextEditor } from "@passui/react/text-editor"
import { useId, useState } from "react"

export function TextEditorUsage() {
    const bioId = useId()
    const [bio, setBio] = useState("")
    return (
        <div className="flex w-full max-w-sm flex-col gap-2">
            <label
                htmlFor={bioId}
                className="text-subheadline font-semibold"
            >
                Bio
            </label>
            <TextEditor
                id={bioId}
                placeholder="A few words about you"
                value={bio}
                onChange={(event) =>
                    setBio(event.target.value)
                }
            />
        </div>
    )
}
