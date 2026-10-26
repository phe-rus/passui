import { LabeledContent } from "@passui/solid/labeled-content"

export function LabeledContentDescriptions() {
    return (
        <div class="w-full max-w-md divide-y divide-separator/60">
            <LabeledContent
                label="Storage"
                description="Encrypted files on every device"
            >
                <strong>12.4 GB</strong>
            </LabeledContent>
            <LabeledContent
                label="Backup"
                description="Last completed a few minutes ago"
            >
                <span>Up to date</span>
            </LabeledContent>
        </div>
    )
}
