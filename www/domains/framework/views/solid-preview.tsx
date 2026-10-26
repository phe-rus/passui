import { useEffect, useRef, useState } from "react"

type PreviewMount = {
    update: (props: Record<string, unknown>) => void
    dispose: () => void
}

/** React owns only the empty mount point; every preview node belongs to Solid. */
export function SolidPreview({
    slug,
    values = {},
}: {
    slug: string
    values?: Record<string, unknown>
}) {
    const root = useRef<HTMLDivElement>(null)
    const instance = useRef<PreviewMount | null>(null)
    const latest = useRef(values)
    const [error, setError] = useState<string>()
    latest.current = values

    useEffect(() => {
        let cancelled = false
        setError(undefined)
        import("@passui/solid/docs/mount")
            .then(({ mountSolidPreview }) => {
                if (cancelled || !root.current) return
                instance.current = mountSolidPreview(
                    root.current,
                    slug,
                    latest.current
                )
            })
            .catch((cause: unknown) => {
                if (!cancelled)
                    setError(
                        cause instanceof Error
                            ? cause.message
                            : "Preview failed to load"
                    )
            })
        return () => {
            cancelled = true
            instance.current?.dispose()
            instance.current = null
        }
    }, [slug])

    useEffect(
        () => instance.current?.update(values),
        [values]
    )

    return (
        <div className="flex min-h-40 items-center justify-center p-8">
            {error && <p role="alert">{error}</p>}
            <div ref={root} data-solid-preview={slug} />
        </div>
    )
}
