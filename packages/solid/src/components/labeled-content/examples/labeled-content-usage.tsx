/** @jsxImportSource solid-js */
import { LabeledContent } from "@passui/solid/labeled-content"

export function LabeledContentUsage() {
    return (
        <LabeledContent
            label="Email"
            description="Your primary address"
        >
            hello@example.com
        </LabeledContent>
    )
}
