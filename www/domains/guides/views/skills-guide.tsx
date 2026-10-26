import {
    getSkillMarkdown,
    getSolidSkillMarkdown,
} from "@/domains/ai-context"
import { DocSection, type TocItem } from "@/domains/catalog"
import { useOrigin } from "../use-origin"
import { Code, CodeBlock, Prose } from "./guide-parts"

export const skillsSections: TocItem[] = [
    { id: "what", title: "What a skill is" },
    { id: "install", title: "Install the Passui skill" },
    { id: "llms", title: "llms.txt" },
    { id: "pages", title: "Any page as Markdown" },
    { id: "skill", title: "The skill" },
]

export function SkillsGuide({
    framework = "react",
}: {
    framework?: "react" | "solid"
}) {
    const origin = useOrigin()
    const name =
        framework === "solid" ? "passui-solid" : "passui"
    const skillUrl = `${origin}/skills/${name}/SKILL.md`
    const llmsUrl =
        framework === "solid"
            ? `${origin}/solid/llms.txt`
            : `${origin}/llms.txt`

    return (
        <>
            <DocSection id="what" title="What a skill is">
                <Prose>
                    A skill is a Markdown file of instructions
                    an AI agent loads when a task calls for
                    it. The Passui skill teaches an agent
                    Passui's rules (tokens, not hex values;
                    strings from the app; one entry point per
                    control) and every component's import, so
                    the code it writes looks like code written
                    here.
                </Prose>
                <Prose>
                    It's generated from these docs, so it
                    always lists the same components, words
                    and imports as the pages.
                </Prose>
            </DocSection>

            <DocSection
                id="install"
                title="Install the Passui skill"
                description="Save it where your agent looks for skills."
            >
                <Prose>Claude Code, for one project:</Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`mkdir -p .claude/skills/${name}
curl -fsSL ${skillUrl} -o .claude/skills/${name}/SKILL.md`}
                />
                <Prose>Claude Code, for every project:</Prose>
                <CodeBlock
                    lang="shellscript"
                    code={`mkdir -p ~/.claude/skills/${name}
curl -fsSL ${skillUrl} -o ~/.claude/skills/${name}/SKILL.md`}
                />
                <Prose>
                    Other agents: save it anywhere in the
                    project and mention it from your{" "}
                    <Code>AGENTS.md</Code>.
                </Prose>
            </DocSection>

            <DocSection
                id="llms"
                title="llms.txt"
                description="An index of every guide and component, one line each, for tools that read llms.txt."
            >
                <CodeBlock
                    lang="shellscript"
                    code={`curl ${llmsUrl}`}
                />
            </DocSection>

            <DocSection
                id="pages"
                title="Any page as Markdown"
                description="Every component page has a Copy for AI button."
            >
                <Prose>
                    It copies that component as Markdown: what
                    it's for, its import, its usage code, its
                    options, best practices and accessibility
                    notes. Paste it into a chat to give an
                    agent exactly that component's context.
                </Prose>
            </DocSection>

            <DocSection
                id="skill"
                title="The skill"
                description="What the agent reads, generated now from these docs."
            >
                <CodeBlock
                    label="SKILL.md"
                    lang="markdown"
                    code={
                        framework === "solid"
                            ? getSolidSkillMarkdown(origin)
                            : getSkillMarkdown(origin)
                    }
                />
            </DocSection>
        </>
    )
}
