import {
    Command,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty,
} from "@passui/react/command"
import { toast } from "@passui/react/toast"

export function CommandKeywords() {
    return (
        <Command className="w-full max-w-sm">
            <CommandInput placeholder="Try typing appearance…" />
            <CommandList>
                <CommandEmpty>No matching settings.</CommandEmpty>
                <CommandGroup heading="Settings">
                    <CommandItem
                        value="Theme"
                        keywords={["appearance", "light", "dark"]}
                        onSelect={() => toast("Theme selected")}
                    >
                        Theme
                    </CommandItem>
                    <CommandItem value="Notifications" keywords={["alerts", "sounds"]} disabled>
                        Notifications unavailable
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
