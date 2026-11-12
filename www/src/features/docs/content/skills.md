---

title: Skills
summary: "Teach AI agents Passui's rules and components with a skill, llms.txt and Copy for AI."
section: sections
order: 7
---

Agents write better Passui code when they start from Passui's own rules instead of guessing from older libraries. The site gives them three things, all generated from the same registry as these docs, so they never drift from the components you can actually import.

## The Passui skill

A skill is one Markdown file an agent reads before it works. Passui's lives at `https://passui.pherus.org/skills/passui/SKILL.md`. Add it to your project once:

```bash
bunx skills add https://passui.pherus.org/skills/passui/SKILL.md
```

The agent then loads it whenever a project imports `@passui/react`.

## What the skill tells the agent

- **Imports.** One component per subpath, such as `import { Dialog } from "@passui/react/dialog"`. Never a barrel import, because you pay only for what you import.
- **Names.** Parts follow shadcn (`Dialog`, `DialogContent`, `DialogTitle`), so existing habits carry over.
- **Composition.** Triggers take a `render` prop to become your own element, for example a router `Link`, instead of nesting a button inside a link.
- **Styling.** State is styled through data attributes (`data-state`, `data-variant`) and token utilities such as `bg-elevated` and `text-label`. Never raw hex colours or Tailwind sizes like `text-sm`.
- **Icons.** Import from `@passui/icons/<name>` and choose `tone="mono"` or `tone="duo"`.
- **A component list.** Every component with its import path and a one line summary, so the agent picks the right control and imports it correctly.

## Install for your agent

The command above works with any agent that reads the shared skills format. To keep the skill with one project, save the file into that project's skills folder yourself:

```bash
mkdir -p .claude/skills/passui
curl -o .claude/skills/passui/SKILL.md https://passui.pherus.org/skills/passui/SKILL.md
```

Re-run the command to update it. The file is regenerated on every deploy, so it always lists the components that exist today.

## llms.txt

`/llms.txt` is a plain index of every guide and component page, each with its summary and, for components, the import path. Point a tool that browses the web at it, or paste its address into a chat, and the model can find the right page without crawling the whole site.

## Copy for AI

Every component page has a **Copy for AI** button. It copies that page as Markdown: the install line, the import, every example with its source, the accessibility notes and the props tables. Paste it into a chat when you want an answer about one component with all of its facts in view.

## Which one to use

| You want to                                    | Use         |
| ---------------------------------------------- | ----------- |
| Have an agent follow Passui's rules in a repo  | The skill   |
| Let a tool discover the right docs page        | `llms.txt`  |
| Ask about one component with its full contract | Copy for AI |
