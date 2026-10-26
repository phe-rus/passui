import { For } from "solid-js"
import { ContentView } from "@passui/solid/content-view"

const cards = [
    {
        id: "password",
        heading: "Password",
        description: "Changed 3 months ago",
        icon: "▣",
    },
    {
        id: "passkeys",
        heading: "Passkeys",
        description: "2 saved on your devices",
        icon: "⚿",
    },
    {
        id: "devices",
        heading: "Devices",
        description: "Signed in on 3 devices",
        icon: "▯",
    },
]

export function ContentViewShowcase() {
    return (
        <div class="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
            <For each={cards}>
                {(card) => (
                    <ContentView class="relative p-5">
                        <ContentView.Header
                            heading={card.heading}
                            p={card.description}
                            icon={
                                <span
                                    class="text-accent-text"
                                    aria-hidden="true"
                                >
                                    {card.icon}
                                </span>
                            }
                            className="flex flex-col gap-2"
                            pClassName="text-footnote text-label-secondary"
                        >
                            <a
                                href={`#${card.id}`}
                                class="absolute inset-0 rounded-2xl"
                            >
                                <span class="sr-only">
                                    Open {card.heading}
                                </span>
                            </a>
                        </ContentView.Header>
                    </ContentView>
                )}
            </For>
        </div>
    )
}
