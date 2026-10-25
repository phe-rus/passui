import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren,
} from "react"

export type PlatformOS =
    | "ios"
    | "android"
    | "macos"
    | "windows"
    | "linux"
    | "unknown"

const PlatformContext = createContext<PlatformOS>("unknown")

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

export function PlatformScript({
    nonce,
}: {
    nonce?: string
}) {
    return (
        <script
            // Run the library's platform bootstrap before first paint.
            dangerouslySetInnerHTML={{
                __html: `(${initializePlatform.toString()})(${resolvePlatform.toString()}, document.documentElement, navigator.userAgent, navigator.platform, navigator.maxTouchPoints)`,
            }}
            nonce={nonce}
            suppressHydrationWarning
        />
    )
}

export function PlatformProvider({
    children,
}: PropsWithChildren) {
    const [platform, setPlatform] =
        useState<PlatformOS>("unknown")

    useEffect(() => {
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
    }, [])

    return (
        <PlatformContext.Provider value={platform}>
            {children}
        </PlatformContext.Provider>
    )
}

export function usePlatform() {
    return useContext(PlatformContext)
}
