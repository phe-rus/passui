/** @jsxImportSource solid-js */
import {
    createSignal,
    onMount,
    onCleanup,
    Show,
    type JSX,
} from "solid-js"
import { Portal } from "solid-js/web"
/** Escape transformed page layers while retaining the source's scoped appearance. */
export function SheetPortal(props: {
    children: JSX.Element
}) {
    let source!: HTMLSpanElement
    const [host, setHost] = createSignal<HTMLDivElement>()
    onMount(() => {
        const marker = source
        if (!marker) return
        const document = marker.ownerDocument
        const layer = document.createElement("div")
        layer.dataset.passuiOverlay = ""
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
        document.body.appendChild(layer)
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
        onCleanup(() => {
            observer.disconnect()
            layer.remove()
        })
    })
    return (
        <>
            <span ref={source} hidden aria-hidden="true" />
            <Show when={host()}>
                {(mount) => (
                    <Portal mount={mount()}>
                        {props.children}
                    </Portal>
                )}
            </Show>
        </>
    )
}
