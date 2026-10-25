import { Section, toast } from "@passui/react"
import { Button } from "@passui/react/button"

export function SectionActions() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-6">
            <Section title="Data">
                <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none"
                    onClick={() =>
                        toast("Preparing your export")
                    }
                >
                    Export my data
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none"
                    onClick={() => toast("Cache cleared")}
                >
                    Clear cache
                </Button>
            </Section>
            <Section footer="This can't be undone.">
                <Button
                    variant="ghost"
                    className="w-full justify-start rounded-none text-danger"
                >
                    Delete account
                </Button>
            </Section>
        </div>
    )
}
