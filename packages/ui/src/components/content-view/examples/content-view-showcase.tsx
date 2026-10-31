import {
    KeyIcon,
    PasswordIcon,
    SmartphoneIcon,
} from "@passui/react/icons"

import { ContentView } from "@passui/react/content-view"

const cards = [
    {
        id: "password",
        heading: "Password",
        description: "Changed 3 months ago",
        icon: PasswordIcon,
    },
    {
        id: "passkeys",
        heading: "Passkeys",
        description: "2 saved on your devices",
        icon: KeyIcon,
    },
    {
        id: "devices",
        heading: "Devices",
        description: "Signed in on 3 devices",
        icon: SmartphoneIcon,
    },
]

export function ContentViewShowcase() {
    return (
        <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
            {cards.map((card) => (
                <ContentView
                    key={card.id}
                    className="relative p-5"
                >
                    <ContentView.Header
                        heading={card.heading}
                        p={card.description}
                        icon={
                            <card.icon
                                size={20}
                                className="text-accent-text"
                            />
                        }
                        className="flex flex-col gap-2"
                        pClassName="text-footnote text-label-secondary"
                    >
                        {/* the whole card is the link */}
                        <a
                            href={`#${card.id}`}
                            className="absolute inset-0 rounded-2xl"
                        >
                            <span className="sr-only">
                                Open {card.heading}
                            </span>
                        </a>
                    </ContentView.Header>
                </ContentView>
            ))}
        </div>
    )
}
