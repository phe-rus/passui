import { useState } from "react"
import { Button } from "@passui/react/button"
import {
    CommandDialog as CommandPaletteDialog,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@passui/react/command"
import { toast } from "@passui/react/toast"

export function CommandDialog() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button onClick={() => setOpen(true)}>Open commands</Button>
            <CommandPaletteDialog open={open} onClose={() => setOpen(false)} label="Quick actions">
                <CommandInput autoFocus placeholder="Search quick actions…" />
                <CommandList>
                    <CommandEmpty>No actions found.</CommandEmpty>
                    <CommandGroup heading="Actions">
                        <CommandItem
                            value="New folder"
                            onSelect={() => {
                                setOpen(false)
                                toast("Folder created")
                            }}
                        >
                            New folder
                        </CommandItem>
                        <CommandItem
                            value="Archive"
                            onSelect={() => {
                                setOpen(false)
                                toast("Archived")
                            }}
                        >
                            Archive
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandPaletteDialog>
        </>
    )
}
