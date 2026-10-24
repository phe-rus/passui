import {
    type ReactNode,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { createPortal } from "react-dom"

/** Escape transformed page layers while retaining the source's scoped appearance. */
export function SheetPortal({
    children,
}: {
    children: ReactNode
}) {
    const source = useRef<HTMLSpanElement>(null)
    const [host, setHost] = useState<HTMLDivElement | null>(
        null
    )
    useLayoutEffect(() => {
        const marker = source.current
        if (!marker) return
        const document = marker.ownerDocument
        const layer = document.createElement("div")
        layer.dataset.hinoOverlay = ""
        layer.style.display = "contents"
        const attributes = [
            "data-theme",
            "data-accent",
            "data-os",
            "dir",
        ]
        let properties = new Set<string>()
        const inherit = () => {
            for (const name of attributes) {
                const value = marker
                    .closest(`[${name}]`)
                    ?.getAttribute(name)
                if (value === null || value === undefined)
                    layer.removeAttribute(name)
                else layer.setAttribute(name, value)
            }
            const computed = getComputedStyle(marker)
            const next = new Set<string>()
            for (const name of computed) {
                if (!name.startsWith("--")) continue
                next.add(name)
                layer.style.setProperty(
                    name,
                    computed.getPropertyValue(name)
                )
            }
            for (const name of properties)
                if (!next.has(name))
                    layer.style.removeProperty(name)
            properties = next
            layer.style.colorScheme = computed.colorScheme
            layer.style.fontFamily = computed.fontFamily
            layer.style.direction = computed.direction
        }
        inherit()
        document.body.append(layer)
        setHost(layer)
        const observer = new MutationObserver(inherit)
        for (
            let ancestor = marker.parentElement;
            ancestor;
            ancestor = ancestor.parentElement
        ) {
            observer.observe(ancestor, {
                attributes: true,
                attributeFilter: [
                    ...attributes,
                    "style",
                    "class",
                ],
            })
        }
        return () => {
            observer.disconnect()
            layer.remove()
        }
    }, [])
    return (
        <>
            <span ref={source} hidden aria-hidden="true" />
            {host && createPortal(children, host)}
        </>
    )
}
