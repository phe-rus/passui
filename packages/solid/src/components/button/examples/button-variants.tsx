import { Button } from "../button"

export function ButtonVariants() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Destructive</Button>
        </div>
    )
}
