import { GuidePage } from "@/domains/guides/views/guide-page"

/** Both frameworks use one documentation layout and section hierarchy. */
export function SolidGuidePage({ slug }: { slug: string }) {
    return <GuidePage slug={slug} framework="solid" />
}
