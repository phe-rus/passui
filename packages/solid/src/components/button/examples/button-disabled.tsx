import { Button } from "../button"

export function ButtonDisabled() {
    return (
        <div class="flex flex-wrap items-center justify-center gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>
                Unavailable action
            </Button>
        </div>
    )
}
