import { Toggle } from "@passui/react/toggle"
import { useState } from "react"

const tasks = ["Pick a palette", "Review copy", "Ship it"]

export function ToggleCheckboxes() {
    const [done, setDone] = useState([true, false, false])
    const all = done.every(Boolean)
    const some = done.some(Boolean)

    return (
        <div className="flex flex-col gap-3">
            <Toggle
                style="checkbox"
                label="Launch list"
                checked={all}
                mixed={some && !all}
                onChange={(checked) =>
                    setDone(tasks.map(() => checked))
                }
            />
            <div className="flex flex-col gap-3 ps-8">
                {tasks.map((task, index) => (
                    <Toggle
                        key={task}
                        style="checkbox"
                        label={task}
                        checked={done[index]}
                        onChange={(checked) =>
                            setDone((current) =>
                                current.map((value, at) =>
                                    at === index
                                        ? checked
                                        : value
                                )
                            )
                        }
                    />
                ))}
            </div>
        </div>
    )
}
