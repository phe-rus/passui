import { CheckIcon, CloseIcon } from "@passui/react/icons"
import type { Practice } from "../types"

type PracticesListProps = {
    practices: Practice[]
}

/** What to do and what to avoid, each marked at a glance. */
export function PracticesList({
    practices,
}: PracticesListProps) {
    return (
        <ul className="m-0 flex list-none flex-col gap-5 p-0">
            {practices.map((practice) => (
                <li
                    key={practice.text}
                    className="flex items-start gap-2"
                >
                    {practice.kind === "do" ? (
                        <CheckIcon size={18} />
                    ) : (
                        <CloseIcon size={18} />
                    )}
                    <div className="flex flex-col gap-2">
                        <strong>
                            {practice.kind === "do"
                                ? "Do"
                                : "Don't"}
                        </strong>
                        <p>{practice.text}</p>
                    </div>
                </li>
            ))}
        </ul>
    )
}
