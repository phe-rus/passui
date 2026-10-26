import { useState } from "react"
import { CodeView } from "@/domains/playground"
import { SolidPreview } from "./solid-preview"

type Scene = {
    id: string
    title: string
    description: string
    source: string
}

/** The same preview-and-code surface used by the React docs, with native Solid scenes. */
export function SolidPlayground({
    slug,
    scenes,
}: {
    slug: string
    scenes: Scene[]
}) {
    const [selected, setSelected] = useState("usage")
    const scene =
        scenes.find(({ id }) => id === selected) ?? scenes[0]

    return (
        <div className="overflow-hidden rounded-5xl ring-1 ring-separator/60">
            <div className="flex flex-wrap gap-2 border-separator/60 border-b bg-elevated p-3">
                {scenes.map(({ id, title }) => (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={scene.id === id}
                        onClick={() => setSelected(id)}
                        className={`rounded-full px-3 py-1.5 text-footnote font-semibold transition-colors ${
                            scene.id === id
                                ? "bg-accent text-on-accent"
                                : "bg-fill/70 text-label hover:bg-fill"
                        }`}
                    >
                        {title}
                    </button>
                ))}
            </div>
            <div className="bg-fill/40">
                <SolidPreview slug={`${slug}-${scene.id}`} />
            </div>
            <div className="border-separator/60 border-t">
                <CodeView
                    code={scene.source}
                    label={`${slug}-${scene.id}.tsx`}
                />
            </div>
            <p className="m-0 border-separator/60 border-t bg-elevated px-4 py-3 text-footnote text-label-secondary">
                {scene.description}
            </p>
        </div>
    )
}
