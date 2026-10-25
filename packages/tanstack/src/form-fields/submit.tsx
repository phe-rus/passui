import { Button } from "@passui/react/button"
import { useFormContext } from "../forms/contexts"

export function Submit({ label }: { label: string }) {
    const form = useFormContext()
    return (
        <form.Subscribe
            selector={(state) => [
                state.isSubmitting,
                state.canSubmit,
                state.isDirty,
                state.isTouched,
            ]}
        >
            {([pending, valid, dirty, touched]) => (
                <Button
                    type="submit"
                    variant="default"
                    size="default"
                    aria-busy={pending}
                    disabled={
                        pending ||
                        !valid ||
                        !dirty ||
                        !touched
                    }
                    className="w-full"
                >
                    {pending && (
                        <span
                            aria-hidden
                            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
                        />
                    )}
                    {label}
                </Button>
            )}
        </form.Subscribe>
    )
}
