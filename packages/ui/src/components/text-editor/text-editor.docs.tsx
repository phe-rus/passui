import { TextEditorComment } from "./examples/text-editor-comment"
import type { ComponentProps } from "react"
import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { TextEditorCount } from "./examples/text-editor-count"
import { TextEditorShowcase } from "./examples/text-editor-showcase"
import { TextEditorUsage } from "./examples/text-editor-usage"
import { TextEditor } from "./text-editor"

type TextEditorProps = ComponentProps<typeof TextEditor>
type DemoProps = Pick<
    TextEditorProps,
    "placeholder" | "disabled" | "readOnly"
>

function TextEditorDemo(props: DemoProps) {
    const [bio, setBio] = useState("")
    return (
        <div className="w-full max-w-sm">
            <TextEditor
                {...props}
                aria-label="Bio"
                value={bio}
                onChange={(event) =>
                    setBio(event.target.value)
                }
            />
        </div>
    )
}

export const textEditorDocs = defineDocs<TextEditorProps>()({
    slug: "text-editor",
    name: "TextEditor",
    importPath: "@passui/react/text-editor",
    controls: {
        placeholder: {
            kind: "text",
            default: "A few words about you",
        },
        disabled: { kind: "boolean", default: false },
        readOnly: { kind: "boolean", default: false },
    },
    render: (values) => <TextEditorDemo {...values} />,
    childrenSnippet: () => ({
        imports: ['import { useState } from "react"'],
        setup: ['const [bio, setBio] = useState("")'],
        children: "",
        extraProps: { "aria-label": "Bio" },
        expressionProps: {
            value: "bio",
            onChange: "(event) => setBio(event.target.value)",
        },
    }),
    usage: TextEditorUsage,
    showcase: TextEditorShowcase,
    examples: [
        { id: "count", component: TextEditorCount },
        { id: "comment", component: TextEditorComment },
    ],
})
