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
    loop: _loop,
    open = true,
    onKeyDown,
    className,
    ...props
}: ComponentProps<"div"> & {
    loop?: boolean
    open?: boolean
}) {
    const [query, setQuery] = useState("")
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
                setQuery: (next) => {
                    setQuery(next)
                    setActive("")
                },
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
                    if (!items.length) return
                    const index = items.findIndex((item) => item.id === active)
                    if (event.key === "Enter") {
                        event.preventDefault()
                        ;(items[index] ?? items[0])?.click()
                        return
                    }
                    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return
                    event.preventDefault()
                    const next =
                        index < 0
                            ? event.key === "ArrowDown"
                                ? 0
                                : items.length - 1
                            : (index + (event.key === "ArrowDown" ? 1 : -1) + items.length) %
                              items.length
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
    return (
        <input
            {...props}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={search.open}
            aria-controls={search.listId}
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
}: ComponentProps<"fieldset"> & {
    heading?: React.ReactNode
}) {
    const id = useId()
    return (
        <fieldset
            {...props}
            className={cn("not-has-[[data-search-result]:not([hidden])]:hidden", className)}
            aria-labelledby={heading ? id : undefined}
        >
            {heading && (
                <legend id={id} className="px-2 py-2 text-caption font-medium text-label-tertiary">
                    {heading}
                </legend>
            )}
            {children}
        </fieldset>
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
        search.register(id, visible)
        return () => search.register(id, null)
    }, [id, visible, search.register])
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
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-fill aria-selected:bg-accent-soft",
                className
            )}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => onSelect?.(value)}
        />
    )
}
