import { For } from "solid-js"
import { ContentView } from "@passui/solid/content-view"
import {
    Key01Icon,
    LockPasswordIcon,
    SmartPhone01Icon,
} from "@hugeicons/core-free-icons"
import { Hugeicon } from "../../../icons/hugeicon"

const cards = [
    {
        id: "password",
        heading: "Password",
        description: "Changed 3 months ago",
        icon: LockPasswordIcon,
    },
    {
        id: "passkeys",
        heading: "Passkeys",
        description: "2 saved on your devices",
        icon: Key01Icon,
    },
    {
        id: "devices",
        heading: "Devices",
        description: "Signed in on 3 devices",
        icon: SmartPhone01Icon,
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
                                <Hugeicon
                                    icon={card.icon}
                                    size={20}
                                    class="text-accent-text"
                                />
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
