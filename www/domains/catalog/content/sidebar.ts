import type { sidebarDocs } from "@passui/react/docs"
import type { ComponentContent } from "../types"

export const sidebarContent: ComponentContent<
    typeof sidebarDocs
> = {
    summary:
        "Titled groups of navigation rows for a sidebar, with an icon, a label and an optional count on each row.",
    usage: "Use it for an app's places on larger screens. Rows are your router's links: give them sidebarItemClass and put SidebarItemContent inside.",
    propDescriptions: {
        title: "The small heading above a group of rows.",
        counts: "The count prop of SidebarItemContent: a number at the end of a row, such as unread items.",
    },
    examples: {
        groups: {
            title: "Several groups",
            description:
                "Groups for places, folders and housekeeping, on the sidebar background.",
        },
        unread: {
            title: "Counts that change",
            description:
                "Counts show what needs attention and disappear once there's nothing left.",
        },
    },
    anatomy: [
        {
            element: "SidebarSection",
            description: "A titled group of rows.",
            required: true,
        },
        {
            element: "Row link",
            description:
                "Your router's link, styled by sidebarItemClass(active).",
            required: true,
        },
        {
            element: "SidebarItemContent",
            description:
                "The icon, label and count inside a row. Icon and count take the accent color when active.",
            required: true,
        },
    ],
    practices: [
        {
            kind: "do",
            text: "Set aria-current on the active row's link. Routers like TanStack Router do this for you.",
        },
        {
            kind: "do",
            text: "Show counts only when they need attention, like unread items.",
        },
        {
            kind: "dont",
            text: "Show a sidebar on phones. Use TabBar there instead.",
        },
    ],
    accessibility: [
        "Wrap the sections in a nav with an aria-label, so the sidebar is a named landmark.",
        "Rows are real links, so they open in new tabs and work with the keyboard as expected.",
    ],
}
