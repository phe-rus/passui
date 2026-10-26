import { LabeledContent } from "@passui/solid/labeled-content"

export function LabeledContentValues() {
    return (
        <div class="w-full max-w-md divide-y divide-separator/60">
            <LabeledContent label="Plan">
                Personal
            </LabeledContent>
            <LabeledContent label="Members">
                4 collaborators
            </LabeledContent>
            <LabeledContent label="Storage">
                12.4 GB of 50 GB
            </LabeledContent>
        </div>
    )
}
