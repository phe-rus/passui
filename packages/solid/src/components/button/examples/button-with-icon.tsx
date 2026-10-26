import { Button } from "@passui/solid/button"

export function ButtonWithIcon() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <Button variant="accent">
                <span aria-hidden="true">✉</span> Email
            </Button>
            <Button variant="secondary">
                <span aria-hidden="true">↓</span> Download
            </Button>
            <Button variant="destructive">
                <span aria-hidden="true">▤</span> Delete
            </Button>
        </div>
    )
}
