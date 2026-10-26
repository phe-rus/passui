import { createSignal } from "solid-js"
import { Button } from "@passui/solid/button"
import { Toggle } from "@passui/solid/toggle"

export function ButtonDisabled() {
    const [agreed, setAgreed] = createSignal(false)
    return (
        <div class="flex w-full max-w-xs flex-col gap-4">
            <Toggle
                style="checkbox"
                label="I agree to the terms"
                checked={agreed()}
                onChange={setAgreed}
            />
            <Button disabled={!agreed()}>
                Create account
            </Button>
        </div>
    )
}
