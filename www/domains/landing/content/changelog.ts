import type { ChangelogEntry } from "../types"

// Real milestones from the repository history, newest first.
export const changelog: ChangelogEntry[] = [
    {
        date: "2026-10-14",
        title: "The documentation site gets a home",
        summary:
            "Originally launched as Hino, the public site lets every component run live, with its props, theme, accent and platform one click away.",
    },
    {
        date: "2026-10-11",
        title: "Stronger design system contracts",
        summary:
            "Typed choices for every variant and size, plus tests that check token contrast and core controls.",
    },
    {
        date: "2026-10-11",
        title: "One package for controls and tokens",
        summary:
            "At this milestone, controls and tokens shipped together as @phe-rus/hino. Passui now shares @passui/tokens across framework packages.",
    },
]
