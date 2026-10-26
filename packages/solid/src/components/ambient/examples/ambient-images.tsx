import { Ambient } from "@passui/solid/ambient"
import { For } from "solid-js"

const people = [
    { name: "Aiko", src: "/avatars/aiko.svg" },
    { name: "Kenji", src: "/avatars/kenji.svg" },
    { name: "Mira", src: "/avatars/mira.svg" },
]

export function AmbientImages() {
    return (
        <div class="grid w-full max-w-xl grid-cols-3 gap-2">
            <For each={people}>
                {(person) => (
                    <Ambient
                        src={person.src}
                        class="flex flex-col items-center gap-2 py-8"
                    >
                        <img
                            src={person.src}
                            alt=""
                            class="size-14 rounded-full"
                        />
                        <span class="text-subheadline font-medium text-label">
                            {person.name}
                        </span>
                    </Ambient>
                )}
            </For>
        </div>
    )
}
