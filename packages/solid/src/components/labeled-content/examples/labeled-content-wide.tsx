import { LabeledContent } from "@passui/solid/labeled-content"

export function LabeledContentWide() {
    return (
        <div class="w-full max-w-md">
            <LabeledContent
                wide
                stacked
                label="Workspace description"
                description="A wider value stays readable on narrow screens."
            >
                <p class="rounded-xl bg-fill p-3 text-subheadline text-label">
                    Shared projects and secure documents for
                    the entire team.
                </p>
            </LabeledContent>
        </div>
    )
}
