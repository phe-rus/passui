import {
    createComponent,
    createContext,
    createSignal,
    onMount,
    useContext,
    type Accessor,
    type ParentProps,
} from "solid-js"
import { Dynamic } from "solid-js/web"

export type PlatformOS =
    | "ios"
    | "android"
    | "macos"
    | "windows"
    | "linux"
    | "unknown"

const PlatformContext = createContext<Accessor<PlatformOS>>(
    (): PlatformOS => "unknown"
)

export function detectPlatform(
    userAgent: string,
    platform: string,
    maxTouchPoints: number
): PlatformOS {
    return resolvePlatform(
        null,
        userAgent,
        platform,
        maxTouchPoints
    )
}

export function resolvePlatform(
    override: string | null,
    userAgent: string,
    platform: string,
    maxTouchPoints: number
): PlatformOS {
    if (
        override === "ios" ||
        override === "android" ||
        override === "macos" ||
        override === "windows" ||
        override === "linux" ||
        override === "unknown"
    ) {
        return override
    }
    if (/android/i.test(userAgent)) return "android"
    if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios"
    if (platform === "MacIntel" && maxTouchPoints > 1)
        return "ios"
    if (/Mac/i.test(platform)) return "macos"
    if (/Win/i.test(platform)) return "windows"
    if (/Linux/i.test(platform)) return "linux"
    return "unknown"
}

function initializePlatform(
    resolve: typeof resolvePlatform,
    root: HTMLElement,
    userAgent: string,
    platform: string,
    maxTouchPoints: number
) {
    root.setAttribute(
        "data-os",
        resolve(
            root.getAttribute("data-os"),
            userAgent,
            platform,
            maxTouchPoints
        )
    )
}

/** Place in the document head to apply platform styling before paint. */
export function PlatformScript(props: { nonce?: string }) {
    return createComponent(Dynamic<"script">, {
        component: "script",
        get nonce() {
            return props.nonce
        },
        innerHTML: `(${initializePlatform.toString()})(${resolvePlatform.toString()}, document.documentElement, navigator.userAgent, navigator.platform, navigator.maxTouchPoints)`,
    })
}

export function PlatformProvider(props: ParentProps) {
    const [platform, setPlatform] =
        createSignal<PlatformOS>("unknown")

    onMount(() => {
        const resolved = resolvePlatform(
            document.documentElement.getAttribute("data-os"),
            navigator.userAgent,
            navigator.platform,
            navigator.maxTouchPoints
        )
        document.documentElement.setAttribute(
            "data-os",
            resolved
        )
        setPlatform(resolved)
    })

    return createComponent(PlatformContext.Provider, {
        value: platform,
        get children() {
            return props.children
        },
    })
}

/** Read inside a reactive expression, for example createMemo(usePlatform). */
export function usePlatform(): PlatformOS {
    return useContext(PlatformContext)()
}
