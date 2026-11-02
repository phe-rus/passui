import {
    createContext,
    useCallback,
    useContext,
    useId,
    useRef,
    useState,
    useEffect,
    type ComponentProps,
} from "react"
import { cn } from "../../lib/class-names"

type SearchState = {
    query: string
    setQuery: (query: string) => void
    active: string
    listId: string
    open: boolean
    visible: number
    register: (id: string, visible: boolean | null) => void
}
const SearchContext = createContext<SearchState | null>(null)
function useSearch() {
    const search = useContext(SearchContext)
    if (!search) throw new Error("Search list controls need a SearchList parent")
    return search
}

export function SearchList({
    loop = true,
    open = true,
    onKeyDown,
    className,
    ...props
}: ComponentProps<"div"> & {
    loop?: boolean
    open?: boolean
}) {
    const [query, setQuery] = useState("")
    const updateQuery = useCallback((next: string) => {
        setQuery(next)
        setActive("")
    }, [])
    const [active, setActive] = useState("")
    const [results, setResults] = useState<Record<string, boolean>>({})
    const listId = useId()
    const ref = useRef<HTMLDivElement>(null)
    const register = useCallback(
        (id: string, visible: boolean | null) =>
            setResults((previous) => {
                if (visible === null) {
                    const next = { ...previous }
                    delete next[id]
                    return next
                }
                if (previous[id] === visible) return previous
                return { ...previous, [id]: visible }
            }),
        []
    )
    return (
        <SearchContext
            value={{
                query,
                setQuery: updateQuery,
                active,
                listId,
                open,
                visible: Object.values(results).filter(Boolean).length,
                register,
            }}
        >
            <div
                {...props}
                ref={ref}
                className={cn("relative", className)}
                onKeyDown={(event) => {
                    onKeyDown?.(event)
                    if (event.defaultPrevented || !open) return
                    const items = Array.from(
                        ref.current?.querySelectorAll<HTMLButtonElement>(
                            "[data-search-result]:not([hidden]):not(:disabled)"
                        ) ?? []
                    )
                    if (!items.length || event.altKey || event.ctrlKey || event.metaKey) return
                    const index = items.findIndex((item) => item.id === active)
                    if (event.key === "Enter") {
                        if (
                            event.target instanceof HTMLElement &&
                            event.target.closest("button, a")
                        )
                            return
                        event.preventDefault()
                        ;(items[index] ?? items[0])?.click()
                        return
                    }
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
                    event.preventDefault()
                    const delta = event.key === "ArrowDown" ? 1 : -1
                    const next =
                        index < 0
                            ? delta === 1
                                ? 0
                                : items.length - 1
                            : loop
                              ? (index + delta + items.length) % items.length
                              : Math.max(0, Math.min(items.length - 1, index + delta))
                    const item = items[next]
                    if (!item) return
                    setActive(item.id)
                    item.scrollIntoView({
                        block: "nearest",
                    })
                }}
            />
        </SearchContext>
    )
}
export function SearchListField({
    value,
    onValueChange,
    className,
    ...props
}: Omit<ComponentProps<"input">, "value" | "onChange"> & {
    value?: string
    onValueChange?: (value: string) => void
}) {
    const search = useSearch()
    useEffect(() => {
        if (value !== undefined) search.setQuery(value)
    }, [value, search.setQuery])
    return (
        <input
            {...props}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={search.open}
            aria-controls={search.open ? search.listId : undefined}
            aria-activedescendant={search.open && search.active ? search.active : undefined}
            aria-label={props["aria-label"] ?? props.placeholder}
            value={value ?? search.query}
            onChange={(event) => {
                search.setQuery(event.target.value)
                onValueChange?.(event.target.value)
            }}
            className={cn(
                "min-h-11 w-full rounded-full border border-separator bg-fill/60 px-4 text-subheadline text-label outline-none focus-visible:ring-2 focus-visible:ring-accent-text/50",
                className
            )}
        />
    )
}
export function SearchListResults({ className, ...props }: ComponentProps<"div">) {
    const search = useSearch()
    return (
        <div
            {...props}
            id={search.listId}
            role="listbox"
            hidden={!search.open}
            className={cn("overflow-y-auto p-1", className)}
        />
    )
}
export function SearchListEmpty(props: ComponentProps<"div">) {
    const search = useSearch()
    return search.visible ? null : <div {...props} role="status" />
}
export function SearchListGroup({
    heading,
    children,
    className,
    ...props
}: ComponentProps<"div"> & {
    heading?: React.ReactNode
}) {
    const id = useId()
    return (
        // biome-ignore lint/a11y/useSemanticElements: Listbox option groups are not form fieldsets.
        <div
            {...props}
            role="group"
            className={cn("not-has-[[data-search-result]:not([hidden])]:hidden", className)}
            aria-labelledby={heading ? id : undefined}
        >
            {heading && (
                <div id={id} className="px-2 py-2 text-caption font-medium text-label-tertiary">
                    {heading}
                </div>
            )}
            {children}
        </div>
    )
}
export function SearchListItem({
    value,
    keywords = [],
    onSelect,
    className,
    ...props
}: Omit<ComponentProps<"button">, "value" | "onSelect"> & {
    value: string
    keywords?: string[]
    onSelect?: (value: string) => void
}) {
    const search = useSearch()
    const id = useId()
    const haystack = [value, ...keywords].join(" ").toLocaleLowerCase()
    const visible = search.query
        .toLocaleLowerCase()
        .trim()
        .split(/\s+/)
        .every((word) => haystack.includes(word))
    useEffect(() => {
        search.register(id, visible && !props.disabled)
        return () => search.register(id, null)
    }, [id, visible, props.disabled, search.register])
    return (
        <button
            {...props}
            type="button"
            id={id}
            role="option"
            tabIndex={-1}
            hidden={!visible}
            data-search-result=""
            aria-selected={search.active === id}
            data-selected={search.active === id ? "true" : undefined}
            className={cn(
                "flex min-h-9 w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-subheadline text-label hover:bg-fill aria-selected:bg-fill [@media(pointer:coarse)]:min-h-11",
                className
            )}
            onMouseDown={(event) => {
                props.onMouseDown?.(event)
                if (!event.defaultPrevented) event.preventDefault()
            }}
            onClick={(event) => {
                props.onClick?.(event)
                if (!event.defaultPrevented) onSelect?.(value)
            }}
        />
    )
}
