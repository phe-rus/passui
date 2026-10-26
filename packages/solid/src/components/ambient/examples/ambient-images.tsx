/** @jsxImportSource solid-js */
import { Ambient } from "@passui/solid/ambient"
import { For } from "solid-js"

const people = [
    { name: "Aiko", src: "/avatars/aiko.svg" },
    { name: "Kenji", src: "/avatars/kenji.svg" },
    { name: "Mira", src: "/avatars/mira.svg" },
]

export function AmbientImages() {
    return (
        <div class="flex w-full flex-wrap items-center justify-center gap-5">
            <For each={people}>
                {(person) => (
                    <Ambient
                        src={person.src}
                        class="flex w-28 flex-col items-center gap-3 py-8 text-center"
                    >
                        <img
                            src={person.src}
                            alt={person.name}
                            class="size-16 rounded-full"
                        />
                        <span class="text-footnote font-semibold text-label">
                            {person.name}
                        </span>
                    </Ambient>
                )}
            </For>
        </div>
    )
}
