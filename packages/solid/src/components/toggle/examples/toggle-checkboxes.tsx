import { createSignal, For } from "solid-js"
import { Toggle } from "@passui/solid/toggle"

const tasks = ["Pick a palette", "Review copy", "Ship it"]

export function ToggleCheckboxes() {
    const [done, setDone] = createSignal([true, false, false])

    return (
        <div class="flex flex-col gap-3">
            <Toggle
                style="checkbox"
                label="Launch list"
                checked={done().every(Boolean)}
                mixed={
                    done().some(Boolean) &&
                    !done().every(Boolean)
                }
                onChange={(checked) =>
                    setDone(tasks.map(() => checked))
                }
            />
            <div class="flex flex-col gap-3 ps-8">
                <For each={tasks}>
                    {(task, index) => (
                        <Toggle
                            style="checkbox"
                            label={task}
                            checked={done()[index()]}
                            onChange={(checked) =>
                                setDone((current) =>
                                    current.map(
                                        (value, at) =>
                                            at === index()
                                                ? checked
                                                : value
                                    )
                                )
                            }
                        />
                    )}
                </For>
            </div>
        </div>
    )
}
