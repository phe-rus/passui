/** @jsxImportSource solid-js */
import {
    createContext,
    createEffect,
    createSignal,
    mergeProps,
    onCleanup,
    onMount,
    useContext,
    type JSX,
} from "solid-js"

type ValueObject = Record<string, string>
export type SystemTheme = "dark" | "light"
export type Attribute = `data-${string}` | "class"
export interface UseThemeProps {
    readonly themes: string[]
    readonly forcedTheme?: string
    readonly theme?: string
    readonly systemTheme?: SystemTheme
    setTheme: (
        value: string | ((previous: string) => string)
    ) => void
}
export interface ThemeProviderProps {
    children?: JSX.Element
    themes?: string[]
    forcedTheme?: string
    enableSystem?: boolean
    disableTransitionOnChange?: boolean
    enableColorScheme?: boolean
    storageKey?: string
    defaultTheme?: string
    attribute?: Attribute | Attribute[]
    value?: ValueObject
    nonce?: string
}

const ThemeContext = createContext<UseThemeProps>()
const emptyTheme: UseThemeProps = {
    themes: [],
    setTheme: () => {},
}
const mediaQuery = "(prefers-color-scheme: dark)"
export function useTheme() {
    return useContext(ThemeContext) ?? emptyTheme
}

export function ThemeProvider(supplied: ThemeProviderProps) {
    if (useContext(ThemeContext)) return supplied.children
    const props = mergeProps(
        {
            enableSystem: true,
            enableColorScheme: true,
            disableTransitionOnChange: false,
            storageKey: "theme",
            attribute: "data-theme" as Attribute,
            themes: ["light", "dark"],
            get defaultTheme() {
                return supplied.enableSystem === false
                    ? "light"
                    : "system"
            },
        },
        supplied
    )
    const [theme, setThemeState] = createSignal(
        props.defaultTheme
    )
    const [system, setSystem] =
        createSignal<SystemTheme>("light")
    const [mounted, setMounted] = createSignal(false)
    function setTheme(
        value: string | ((previous: string) => string)
    ) {
        const next =
            typeof value === "function"
                ? value(theme())
                : value
        setThemeState(next)
        try {
            if (typeof window !== "undefined")
                window.localStorage.setItem(
                    props.storageKey,
                    next
                )
        } catch {
            /* Storage can be unavailable in embedded documents. */
        }
    }
    onMount(() => {
        const media = window.matchMedia(mediaQuery)
        const updateSystem = () =>
            setSystem(media.matches ? "dark" : "light")
        updateSystem()
        try {
            setThemeState(
                window.localStorage.getItem(
                    props.storageKey
                ) || props.defaultTheme
            )
        } catch {
            setThemeState(props.defaultTheme)
        }
        const updateStorage = (event: StorageEvent) => {
            if (
                event.key === props.storageKey ||
                event.key === null
            )
                setThemeState(
                    event.newValue || props.defaultTheme
                )
        }
        media.addEventListener("change", updateSystem)
        window.addEventListener("storage", updateStorage)
        onCleanup(() => {
            media.removeEventListener("change", updateSystem)
            window.removeEventListener(
                "storage",
                updateStorage
            )
        })
        setMounted(true)
    })
    createEffect(() => {
        if (!mounted()) return
        const selected = props.forcedTheme ?? theme()
        const resolved =
            selected === "system" && props.enableSystem
                ? system()
                : selected
        const root = document.documentElement
        const values = props.value
            ? Object.values(props.value)
            : props.themes
        const name = props.value
            ? props.value[resolved]
            : resolved
        let transition: HTMLStyleElement | undefined
        if (props.disableTransitionOnChange) {
            transition = document.createElement("style")
            if (props.nonce) transition.nonce = props.nonce
            transition.textContent =
                "*,*::before,*::after{transition:none!important}"
            document.head.appendChild(transition)
        }
        for (const attribute of Array.isArray(props.attribute)
            ? props.attribute
            : [props.attribute]) {
            if (attribute === "class") {
                root.classList.remove(...values)
                if (name) root.classList.add(name)
            } else if (name)
                root.setAttribute(attribute, name)
            else root.removeAttribute(attribute)
        }
        if (props.enableColorScheme)
            root.style.colorScheme =
                resolved === "light" || resolved === "dark"
                    ? resolved
                    : props.defaultTheme === "light" ||
                        props.defaultTheme === "dark"
                      ? props.defaultTheme
                      : ""
        if (transition) {
            window.getComputedStyle(document.body)
            const timer = setTimeout(
                () => transition?.remove(),
                1
            )
            onCleanup(() => {
                clearTimeout(timer)
                transition?.remove()
            })
        }
    })
    const context: UseThemeProps = {
        get themes() {
            return props.enableSystem
                ? [...props.themes, "system"]
                : props.themes
        },
        get theme() {
            return theme()
        },
        get systemTheme() {
            return props.enableSystem ? system() : undefined
        },
        get forcedTheme() {
            return props.forcedTheme
        },
        setTheme,
    }
    return (
        <ThemeContext.Provider value={context}>
            <script
                nonce={props.nonce}
                innerHTML={`(${script.toString()})(${JSON.stringify([props.attribute, props.storageKey, props.defaultTheme, props.forcedTheme, props.themes, props.value, props.enableSystem, props.enableColorScheme]).slice(1, -1).replace(/</g, "\\u003c")})`}
            />
            {props.children}
        </ThemeContext.Provider>
    )
}

/* Bootstrap adapted from next-themes (MIT), as in the React implementation. */
export const script = (
    attribute: Attribute | Array<Attribute>,
    storageKey: string,
    defaultTheme: string,
    forcedTheme: string | undefined,
    themes: Array<string>,
    value: ValueObject | undefined,
    enableSystem: boolean,
    enableColorScheme: boolean
) => {
    const el = document.documentElement
    const systemThemes = ["light", "dark"]
    const attributes = Array.isArray(attribute)
        ? attribute
        : [attribute]
    const attrValues = value ? Object.values(value) : themes

    function applyClassAttr(name: string | undefined) {
        el.classList.remove(...attrValues)
        if (name) {
            el.classList.add(name)
        }
    }

    function applyDataAttr(
        attr: string,
        name: string | undefined
    ) {
        if (name) {
            el.setAttribute(attr, name)
        } else {
            el.removeAttribute(attr)
        }
    }

    function updateDOM(theme: string) {
        const name = value ? value[theme] : theme

        for (const attr of attributes) {
            if (attr === "class") {
                applyClassAttr(name)
            } else if (attr.startsWith("data-")) {
                applyDataAttr(attr, name)
            }
        }

        setColorScheme(theme)
    }

    function setColorScheme(theme: string) {
        if (!enableColorScheme) {
            return
        }

        const fallback = systemThemes.includes(defaultTheme)
            ? defaultTheme
            : null
        const colorScheme = systemThemes.includes(theme)
            ? theme
            : fallback
        el.style.colorScheme = colorScheme || ""
    }

    function resolveSystemTheme() {
        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light"
    }

    if (forcedTheme) {
        const resolvedForcedTheme =
            forcedTheme === "system" && enableSystem
                ? resolveSystemTheme()
                : forcedTheme
        updateDOM(resolvedForcedTheme)
    } else {
        try {
            const themeName =
                localStorage.getItem(storageKey) ||
                defaultTheme
            const isSystem =
                enableSystem && themeName === "system"
            const theme = isSystem
                ? resolveSystemTheme()
                : themeName
            updateDOM(theme)
        } catch {
            // localStorage might not be available
            updateDOM(
                defaultTheme === "system" && enableSystem
                    ? resolveSystemTheme()
                    : defaultTheme
            )
        }
    }
}
