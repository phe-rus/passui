import { Button } from "../button"

export function ButtonSizes() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
        </div>
    )
}
