/** Host setup is separate from the options shown in the playground. */
export function getSetup(slug: string) {
    const hosts: Record<
        string,
        { name: string; purpose: string }
    > = {
        "context-menu": {
            name: "ContextMenuHost",
            purpose:
                "Mount one ContextMenuHost near your app root. useContextMenu adds right-click and long-press handlers; openMenu opens the same menu engine from a button element.",
        },
        tooltip: {
            name: "TooltipHost",
            purpose:
                "Mount one TooltipHost near your app root. Targets supply data-tooltip; IconButton supplies it from its required label. The host itself has no props.",
        },
        toast: {
            name: "Toaster",
            purpose:
                "Mount one Toaster near your app root, then call toast from an action or async result. Keep success feedback tied to confirmed outcomes.",
        },
    }
    const host = hosts[slug]
    if (!host) return undefined
    return {
        description: host.purpose,
        code: `import { ${host.name} } from "@passui/react"\nimport type { ReactNode } from "react"\n\nexport function FeedbackRoot({ children }: { children: ReactNode }) {\n    return (\n        <>\n            {children}\n            <${host.name} />\n        </>\n    )\n}`,
    }
}
