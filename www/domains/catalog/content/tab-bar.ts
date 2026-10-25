import type { tabBarDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const tabBarContent: ComponentContent<
    typeof tabBarDocs
> = {
    summary:
        "The app's main places in a floating glass capsule at the bottom of the screen, as iOS 26 draws it, with an optional Search button.",
    usage: "Use it on phones for three to five top-level places. It works with any router: renderLink spreads the bar's props onto your own link.",
    propDescriptions: {
        label: "Names the navigation for screen readers, such as Main.",
        active: "The current tab's id, often the current path. Pass null on screens the bar has no tab for.",
        search: "Adds a round Search button at the trailing end, with its label and what it does.",
    },
    examples: {
        minimize: {
            title: "Minimize on scroll",
            description:
                "Scroll the list down and the capsule shrinks to the current tab. Scroll back up, or tap it, to bring every tab back.",
        },
        "five-tabs": {
            title: "Five tabs",
            description:
                "The most a bar should hold; labels shorten to fit a phone's width.",
        },
    },
    anatomy: [
        {
            element: "Capsule",
            description:
                "Glass that holds the tabs and slides the selection between them.",
            required: true,
        },
        {
            element: "Tab",
            description:
                "Your router's link with an icon and a short label, from renderLink.",
            required: true,
        },
        {
            element: "Search button",
            description:
                "A separate round button at the trailing end.",
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Give every tab an icon and a one-word label.",
        },
        {
            kind: "do",
            text: "Leave room at the bottom of scrolling content, so the last row isn't hidden under the bar.",
        },
        {
            kind: "dont",
            text: "Put actions such as New or Share in it. Tabs are places, not commands.",
        },
    ],
    accessibility: [
        "A nav landmark named by label. The current tab has aria-current set to page.",
        "On Android the bar keeps its full size, as Android's own bars do. Pick Android in the playground's settings to see it.",
        "The Search button is labelled by search.label, because it shows only an icon.",
    ],
}
