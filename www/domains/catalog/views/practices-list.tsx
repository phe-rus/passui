import { cn } from "@passui/react/cn"
import type { Practice } from "../types"

type PracticesListProps = {
    practices: Practice[]
}

/** What to do and what to avoid, each marked at a glance. */
export function PracticesList({
    practices,
}: PracticesListProps) {
    return (
        <ul className="m-0 flex list-none flex-col overflow-hidden rounded-3xl p-0 ring-1 ring-separator/60">
            {practices.map((practice) => (
                <li
                    key={practice.text}
                    className="flex items-start gap-4 border-separator/60 border-t px-4 py-3.5 first:border-t-0"
                >
                    <span
                        className={cn(
                            "mt-0.5 w-14 shrink-0 rounded-full py-0.5 text-center text-caption font-bold",
                            practice.kind === "do"
                                ? "bg-success/15 text-success"
                                : "bg-danger/15 text-danger"
                        )}
                    >
                        {practice.kind === "do"
                            ? "Do"
                            : "Don't"}
                    </span>
                    <span className="text-subheadline text-label">
                        {practice.text}
                    </span>
                </li>
            ))}
        </ul>
    )
}
