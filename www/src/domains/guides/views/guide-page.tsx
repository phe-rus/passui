import { ChevronLeftIcon, ChevronRightIcon } from "@passui/react/icons"
import { Link } from "@tanstack/react-router"
import type { ComponentType } from "react"
import { OnThisPage, type TocItem } from "@/domains/catalog"
import { getGuide, getGuideNeighbours } from "../get-guides"
import type { GuideSlug } from "../types"
import { InstallationGuide, installationSections } from "./installation-guide"
import { IntroductionGuide, introductionSections } from "./introduction-guide"
import { SkillsGuide, skillsSections } from "./skills-guide"
import { ThemingGuide, themingSections } from "./theming-guide"
import { TypesetGuide, typesetSections } from "./typeset-guide"

const bodies: Record<GuideSlug, { Body: ComponentType; sections: TocItem[] }> = {
    introduction: {
        Body: IntroductionGuide,
        sections: introductionSections,
    },
    installation: {
        Body: InstallationGuide,
        sections: installationSections,
    },
    theming: {
        Body: ThemingGuide,
        sections: themingSections,
    },
    typeset: {
        Body: TypesetGuide,
        sections: typesetSections,
    },
    skills: { Body: SkillsGuide, sections: skillsSections },
}

/** One getting-started page, laid out like a component page. */
export function GuidePage({ slug }: { slug: string }) {
    const guide = getGuide(slug)
    if (!guide) return null
    const { Body, sections } = bodies[guide.slug]
    const { previous, next } = getGuideNeighbours(guide.slug)

    return (
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_13rem]">
            <article className="flex min-w-0 flex-col gap-14">
                <header className="flex flex-col gap-3">
                    <span className="font-mono text-caption text-label-tertiary">
                        {guide.slug === "introduction"
                            ? "Getting started"
                            : "Getting started · React"}
                    </span>
                    <h1 className="font-brand text-large-title font-extrabold tracking-tight text-label">
                        {guide.title}
                    </h1>
                    <p className="max-w-2xl text-body text-label-secondary">
                        {guide.slug === "installation"
                            ? "Set up Passui in a React app with the CLI or a manual install."
                            : guide.summary}
                    </p>
                </header>
                <Body />
                <nav
                    aria-label="More guides"
                    className="flex justify-between gap-4 border-separator/60 border-t pt-6"
                >
                    {previous ? (
                        <Link
                            to={previous.path}
                            className="flex items-center gap-2 text-subheadline text-label-secondary no-underline hover:text-label"
                        >
                            <ChevronLeftIcon size={16} />
                            {previous.title}
                        </Link>
                    ) : (
                        <span />
                    )}
                    {next && (
                        <Link
                            to={next.path}
                            className="flex items-center gap-2 text-subheadline text-label-secondary no-underline hover:text-label"
                        >
                            {next.title}
                            <ChevronRightIcon size={16} />
                        </Link>
                    )}
                </nav>
            </article>
            <aside className="hidden xl:block">
                <div className="sticky top-24">
                    <OnThisPage items={sections} />
                </div>
            </aside>
        </div>
    )
}
