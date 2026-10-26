import { Button } from "@passui/solid/button"
import { Section } from "@passui/solid/section"
import { toast } from "@passui/solid/toast"
import { Toaster } from "@passui/solid/toaster"

export function SectionActions() {
    return (
        <div class="flex w-full max-w-sm flex-col gap-6">
            <Section title="Data">
                <Button
                    variant="ghost"
                    class="w-full justify-start rounded-none"
                    onClick={() =>
                        toast("Preparing your export")
                    }
                >
                    Export my data
                </Button>
                <Button
                    variant="ghost"
                    class="w-full justify-start rounded-none"
                    onClick={() => toast("Cache cleared")}
                >
                    Clear cache
                </Button>
            </Section>
            <Section footer="This can't be undone.">
                <Button
                    variant="ghost"
                    class="w-full justify-start rounded-none text-danger"
                >
                    Delete account
                </Button>
            </Section>
            <Toaster />
        </div>
    )
}
