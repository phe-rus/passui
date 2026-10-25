import { useState } from "react"
import { Button } from "../button/button"
import { jsxAttribute } from "../../docs/snippet"
import { defineDocs } from "../../docs/types"
import { Dialog, type DialogPresentation } from "./dialog"
import { DialogConfirm } from "./examples/dialog-confirm"
import { DialogForm } from "./examples/dialog-form"
import { DialogInline } from "./examples/dialog-inline"
import { DialogShowcase } from "./examples/dialog-showcase"
import { DialogUsage } from "./examples/dialog-usage"

// `destructive` is the tone of Dialog.Actions in the footer; the snippet
// writes that footer itself.
type DemoProps = {
    title: string
    description: string
    presentation?: DialogPresentation
    destructive: boolean
}

function DialogDemo({
    title,
    description,
    presentation,
    destructive,
}: DemoProps) {
    const [open, setOpen] = useState(false)
    return (
        <div className="flex w-full max-w-sm flex-col items-center gap-4">
            <Button
                variant="secondary"
                onClick={() => setOpen(true)}
            >
                Open dialog
            </Button>
            <Dialog
                open={open}
                onOpenChange={setOpen}
                title={title}
                description={description || undefined}
                presentation={presentation}
                footer={
                    <Dialog.Actions
                        submitLabel={
                            destructive ? "Delete" : "Save"
                        }
                        cancelLabel="Cancel"
                        tone={
                            destructive
                                ? "destructive"
                                : "default"
                        }
                        onConfirm={() => setOpen(false)}
                    />
                }
            />
        </div>
    )
}

export const dialogDocs = defineDocs<DemoProps>()({
    slug: "dialog",
    name: "Dialog",
    importPath: "@passui/react/dialog",
    controls: {
        title: {
            kind: "text",
            default: "Rename project",
            required: true,
        },
        description: {
            kind: "text",
            default: "The new name shows everywhere at once.",
        },
        presentation: {
            kind: "select",
            options: {
                drawer: true,
                center: true,
                inline: true,
            },
            default: "drawer",
        },
        destructive: { kind: "boolean", default: false },
    },
    render: (values) => <DialogDemo {...values} />,
    childrenSnippet: ({ destructive }) => ({
        imports: ['import { useState } from "react"'],
        setup: ["const [open, setOpen] = useState(false)"],
        omit: ["destructive"],
        expressionProps: {
            open: "open",
            onOpenChange: "setOpen",
            footer: `<Dialog.Actions ${jsxAttribute("submitLabel", destructive ? "Delete" : "Save")} cancelLabel="Cancel"${destructive ? ' tone="destructive"' : ""} onConfirm={() => setOpen(false)} />`,
        },
        children: "",
    }),
    usage: DialogUsage,
    showcase: DialogShowcase,
    examples: [
        { id: "form", component: DialogForm },
        {
            id: "confirm",
            component: DialogConfirm,
            playground: { destructive: true },
        },
        {
            id: "inline",
            component: DialogInline,
            playground: { presentation: "inline" },
        },
    ],
    previewHeight: 460,
})
