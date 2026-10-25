import { Ambient } from "@passui/react/ambient"

const people = [
    { name: "Aiko", src: "/avatars/aiko.svg" },
    { name: "Kenji", src: "/avatars/kenji.svg" },
    { name: "Mira", src: "/avatars/mira.svg" },
]

export function AmbientImages() {
    return (
        <div className="grid w-full max-w-xl grid-cols-3 gap-2">
            {people.map((person) => (
                <Ambient
                    key={person.name}
                    src={person.src}
                    className="flex flex-col items-center gap-2 py-8"
                >
                    <img
                        src={person.src}
                        alt=""
                        className="size-14 rounded-full"
                    />
                    <span className="text-subheadline font-medium text-label">
                        {person.name}
                    </span>
                </Ambient>
            ))}
        </div>
    )
}
