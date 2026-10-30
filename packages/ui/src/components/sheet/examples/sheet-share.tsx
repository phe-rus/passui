import { toast } from "@passui/react"
import { Button } from "@passui/react/button"
import { copyText } from "@passui/react/clipboard"
import { Sheet } from "@passui/react/sheet"
import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

export function SheetShare() {
    const [open, setOpen] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Share
            </Button>
            <Sheet
                open={open}
                onClose={() => setOpen(false)}
                label="Share note"
            >
                <div className="flex flex-col gap-5 p-6">
                    <h2 className="text-title3 font-semibold text-label">
                        Share note
                    </h2>
                    <Toggle
                        label="People with the link can edit"
                        checked={canEdit}
                        onChange={setCanEdit}
                    />
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="accent"
                            onClick={async () => {
                                if (
                                    await copyText(
                                        window.location.href
                                    )
                                ) {
                                    setOpen(false)
                                    toast.success(
                                        "Link copied"
                                    )
                                } else
                                    toast.error(
                                        "Could not copy the link"
                                    )
                            }}
                        >
                            Copy link
                        </Button>
                    </div>
                </div>
            </Sheet>
        </>
    )
}
