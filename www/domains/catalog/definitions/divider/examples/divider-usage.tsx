import { Divider } from "@passui/react/divider"

export function DividerUsage() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <span>Account</span>
            <Divider />
            <span>Security</span>
        </div>
    )
}
