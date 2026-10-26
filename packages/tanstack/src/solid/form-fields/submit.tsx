/** @jsxImportSource solid-js */
import { Button } from "@passui/solid/button"
import { useFormContext } from "../forms/contexts"
export function Submit(props: { label: string }) {
    const form = useFormContext()
    return (
        <form.Subscribe
            selector={(state) => ({
                pending: state.isSubmitting,
                valid: state.canSubmit,
                dirty: state.isDirty,
                touched: state.isTouched,
            })}
        >
            {(state) => (
                <Button
                    type="submit"
                    isPending={state().pending}
                    disabled={
                        !state().valid ||
                        !state().dirty ||
                        !state().touched
                    }
                    class="w-full"
                >
                    {props.label}
                </Button>
            )}
        </form.Subscribe>
    )
}
