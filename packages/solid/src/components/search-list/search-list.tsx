import {
    children,
    createContext,
    createEffect,
    createMemo,
    createSignal,
    createUniqueId,
    onCleanup,
    Show,
    splitProps,
    useContext,
    type JSX,
} from "solid-js"
import { cn } from "../../lib/class-names"
import {
    callHandler,
    callInputHandler,
} from "../../lib/events"

type SearchState = {
    readonly query: string
    setQuery: (query: string) => void
    readonly active: string
    listId: string
    readonly open: boolean
    readonly visible: number
    register: (id: string, visible: boolean | null) => void
}
const SearchContext = createContext<SearchState>()
function useSearch() {
    const search = useContext(SearchContext)
    if (!search)
        throw new Error(
            "Search list controls need a SearchList parent"
        )
    return search
}
type DivProps = JSX.HTMLAttributes<HTMLDivElement> & {
    className?: string
}
export function SearchList(
    props: DivProps & { loop?: boolean; open?: boolean }
) {
    const [local, rest] = splitProps(props, [
        "loop",
        "open",
        "onKeyDown",
        "class",
        "className",
        "children",
    ])
    const [query, setQuery] = createSignal("")
    const [active, setActive] = createSignal("")
    const [results, setResults] = createSignal<
        Record<string, boolean>
    >({})
    const listId = createUniqueId()
    let root: HTMLDivElement | undefined
    const search: SearchState = {
        get query() {
            return query()
        },
        setQuery: (next) => {
            setQuery(next)
            setActive("")
        },
        get active() {
            return active()
        },
        listId,
        get open() {
            return local.open ?? true
        },
        get visible() {
            return Object.values(results()).filter(Boolean)
                .length
        },
        register: (id, visible) =>
            setResults((previous) => {
                const next = { ...previous }
                if (visible === null) delete next[id]
                else next[id] = visible
                return next
            }),
    }
    return (
        <SearchContext.Provider value={search}>
            <div
                {...rest}
                ref={root}
                class={cn(
                    "relative",
                    local.class,
                    local.className
                )}
                onKeyDown={(event) => {
                    callHandler(local.onKeyDown, event)
                    if (
                        event.defaultPrevented ||
                        !search.open
                    )
                        return
                    const items = Array.from(
                        root?.querySelectorAll<HTMLButtonElement>(
                            "[data-search-result]:not([hidden]):not(:disabled)"
                        ) ?? []
                    )
                    if (!items.length) return
                    const index = items.findIndex(
                        (item) => item.id === active()
                    )
                    if (event.key === "Enter") {
                        event.preventDefault()
                        ;(items[index] ?? items[0])?.click()
                        return
                    }
                    if (
                        event.key !== "ArrowDown" &&
                        event.key !== "ArrowUp"
                    )
                        return
                    event.preventDefault()
                    let next =
                        index < 0
                            ? event.key === "ArrowDown"
                                ? 0
                                : items.length - 1
                            : index +
                              (event.key === "ArrowDown"
                                  ? 1
                                  : -1)
                    next =
                        local.loop === false
                            ? Math.max(
                                  0,
                                  Math.min(
                                      items.length - 1,
                                      next
                                  )
                              )
                            : (next + items.length) %
                              items.length
                    const item = items[next]
                    if (item) {
                        setActive(item.id)
                        item.scrollIntoView({
                            block: "nearest",
                        })
                    }
                }}
            >
                {local.children}
            </div>
        </SearchContext.Provider>
    )
}
export function SearchListField(
    props: Omit<
        JSX.InputHTMLAttributes<HTMLInputElement>,
        "value" | "onChange"
    > & {
        value?: string
        onValueChange?: (value: string) => void
        className?: string
    }
) {
    const [local, rest] = splitProps(props, [
        "value",
        "onValueChange",
        "class",
        "className",
        "onInput",
    ])
    const search = useSearch()
    return (
        <input
            {...rest}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={search.open}
            aria-controls={search.listId}
            aria-activedescendant={
                search.open && search.active
                    ? search.active
                    : undefined
            }
            aria-label={
                props["aria-label"] ?? props.placeholder
            }
            value={local.value ?? search.query}
            onInput={(event) => {
                search.setQuery(event.currentTarget.value)
                local.onValueChange?.(
                    event.currentTarget.value
                )
                callInputHandler(local.onInput, event)
            }}
            class={cn(
                "min-h-11 w-full rounded-full border border-separator bg-fill/60 px-4 text-subheadline text-label outline-none focus-visible:ring-2 focus-visible:ring-accent-text/50",
                local.class,
                local.className
            )}
        />
    )
}
export function SearchListResults(props: DivProps) {
    const [local, rest] = splitProps(props, [
        "class",
        "className",
    ])
    const search = useSearch()
    return (
        <div
            {...rest}
            id={search.listId}
            role="listbox"
            hidden={!search.open}
            class={cn(
                "overflow-y-auto p-1",
                local.class,
                local.className
            )}
        />
    )
}
export function SearchListEmpty(props: DivProps) {
    const search = useSearch()
    return (
        <Show when={!search.visible}>
            <div {...props} role="status" />
        </Show>
    )
}
export function SearchListGroup(
    props: JSX.FieldsetHTMLAttributes<HTMLFieldSetElement> & {
        heading?: JSX.Element
        className?: string
    }
) {
    const [local, rest] = splitProps(props, [
        "heading",
        "children",
        "class",
        "className",
    ])
    const heading = children(() => local.heading)
    const id = createUniqueId()
    return (
        <fieldset
            {...rest}
            class={cn(
                "not-has-[[data-search-result]:not([hidden])]:hidden",
                local.class,
                local.className
            )}
            aria-labelledby={heading() ? id : undefined}
        >
            <Show when={heading()}>
                <legend
                    id={id}
                    class="px-2 py-2 text-caption font-medium text-label-tertiary"
                >
                    {heading()}
                </legend>
            </Show>
            {local.children}
        </fieldset>
    )
}
export function SearchListItem(
    props: Omit<
        JSX.ButtonHTMLAttributes<HTMLButtonElement>,
        "value" | "onSelect"
    > & {
        value: string
        keywords?: string[]
        onSelect?: (value: string) => void
        className?: string
    }
) {
    const [local, rest] = splitProps(props, [
        "value",
        "keywords",
        "onSelect",
        "class",
        "className",
    ])
    const search = useSearch()
    const id = createUniqueId()
    const visible = createMemo(() => {
        const haystack = [
            local.value,
            ...(local.keywords ?? []),
        ]
            .join(" ")
            .toLocaleLowerCase()
        return search.query
            .toLocaleLowerCase()
            .trim()
            .split(/\s+/)
            .every((word) => haystack.includes(word))
    })
    createEffect(() => {
        search.register(id, visible())
        onCleanup(() => search.register(id, null))
    })
    return (
        <button
            {...rest}
            type="button"
            id={id}
            role="option"
            tabIndex={-1}
            hidden={!visible()}
            data-search-result=""
            aria-selected={search.active === id}
            data-selected={
                search.active === id ? "true" : undefined
            }
            class={cn(
                "flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left hover:bg-fill aria-selected:bg-accent-soft",
                local.class,
                local.className
            )}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => local.onSelect?.(local.value)}
        />
    )
}
