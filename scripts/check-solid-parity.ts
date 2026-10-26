import { registry } from "../packages/ui/src/docs/registry"
import { solidComponentSlugs } from "../packages/solid/src/docs/manifest"

const missing = registry.filter(
    (entry) => !solidComponentSlugs.includes(entry.slug)
)
if (missing.length) {
    console.error(
        `Solid release blocked: ${missing.length} of ${registry.length} documented component families are missing.`
    )
    console.error(
        missing.map((entry) => entry.slug).join(", ")
    )
    process.exitCode = 1
} else {
    console.log(
        `Solid component coverage: ${registry.length}/${registry.length}. Run interaction, accessibility, SSR and hydration verification before publishing.`
    )
}
