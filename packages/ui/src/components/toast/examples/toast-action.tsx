import { Button } from "@passui/react/button"
import { toast } from "@passui/react/toast"
import { useState } from "react"

export function ToastAction() {
    const [archived, setArchived] = useState(0)

    return (
        <div className="flex flex-col items-center gap-3">
            <Button
                variant="secondary"
                onClick={() => {
                    setArchived((count) => count + 1)
                    toast("Note archived", {
                        action: {
                            label: "Undo",
                            onClick: () =>
                                setArchived(
                                    (count) => count - 1
                                ),
                        },
                    })
                }}
            >
                Archive note
            </Button>
            <p className="text-footnote text-label-secondary">
                Archived: {archived}
            </p>
        </div>
    )
}
