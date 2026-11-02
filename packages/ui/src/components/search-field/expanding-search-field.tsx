import {
    type InputHTMLAttributes,
    type Ref,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from "react"
import { useMediaQuery } from "../../hooks/use-media-query"
import { SearchIcon } from "../../icons/icons"
import { cn } from "../../lib/class-names"
import { springs } from "@passui/tokens/motion"

/** One object: the field stays inside the pill, and the lens never moves within it. */
export function ExpandingSearchField({
    inputRef,
    className,
    placeholder = "Search",
    ...props
}: InputHTMLAttributes<HTMLInputElement> & { inputRef: Ref<HTMLInputElement> }) {
    const [expanded, setExpanded] = useState(Boolean(props.value ?? props.defaultValue))
    const reduced = useMediaQuery("(prefers-reduced-motion: reduce)")
    const frame = useRef<HTMLDivElement>(null)
    const pill = useRef<HTMLLabelElement>(null)
    const input = useRef<HTMLInputElement>(null)
    const geometry = useRef({
        width: expanded ? 320 : 44,
        velocity: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        pullX: 0,
        pullY: 0,
        capacity: 320,
        raf: 0,
    })
    const current = useRef({ expanded, reduced })
    const wake = useRef<() => void>(() => {})
    useLayoutEffect(() => {
        const box = frame.current,
            label = pill.current,
            field = input.current
        if (!box || !label || !field) return
        const s = geometry.current
        let previous = 0
        const tick = (now: number) => {
            const dt = previous ? Math.min(0.032, (now - previous) / 1000) : 1 / 60
            previous = now
            const target = current.current.expanded ? s.capacity : Math.min(44, s.capacity)
            const pullX = current.current.expanded ? 0 : s.pullX
            const pullY = current.current.expanded ? 0 : s.pullY
            const { stiffness, damping, mass } = springs.smooth
            if (current.current.reduced) {
                s.width = target
                s.x = 0
                s.y = 0
                s.velocity = 0
                s.vx = 0
                s.vy = 0
            } else {
                s.velocity += (((target - s.width) * stiffness - s.velocity * damping) / mass) * dt
                s.width += s.velocity * dt
                s.vx += (((pullX - s.x) * stiffness - s.vx * damping) / mass) * dt
                s.vy += (((pullY - s.y) * stiffness - s.vy * damping) / mass) * dt
                s.x += s.vx * dt
                s.y += s.vy * dt
            }
            label.style.width = `${Math.max(0, s.width)}px`
            label.style.transform = `translate(${s.x}px, ${s.y}px)`
            /* One number drives the field's reveal; focus lands with the
               expansion, so the caret arrives while the shape is growing. */
            const progress = (s.width - 44) / Math.max(1, s.capacity - 44)
            field.style.opacity = String(Math.max(0, Math.min(1, (progress - 0.55) / 0.45)))
            if (
                Math.abs(s.width - target) < 0.05 &&
                Math.abs(s.velocity) < 0.05 &&
                Math.abs(s.x - pullX) + Math.abs(s.y - pullY) + Math.abs(s.vx) + Math.abs(s.vy) <
                    0.05
            ) {
                label.style.width = `${target}px`
                s.raf = 0
                previous = 0
                return
            }
            s.raf = requestAnimationFrame(tick)
        }
        wake.current = () => {
            if (!s.raf) s.raf = requestAnimationFrame(tick)
        }
        const measure = () => {
            s.capacity = Math.min(320, box.clientWidth)
            wake.current()
        }
        measure()
        const observer = new ResizeObserver(measure)
        observer.observe(box)
        return () => {
            observer.disconnect()
            cancelAnimationFrame(s.raf)
            s.raf = 0
        }
    }, [])
    useEffect(() => {
        current.current = { expanded, reduced }
        wake.current()
    }, [expanded, reduced])
    return (
        <div
            ref={frame}
            className={cn(
                "relative flex h-11 w-full max-w-xs items-center justify-center",
                className
            )}
            onPointerMove={(event) => {
                if (expanded || reduced || event.pointerType !== "mouse") return
                // Measure the frame, which stays still; measuring the object being
                // moved creates a feedback loop and a visible shiver.
                const rect = event.currentTarget.getBoundingClientRect()
                const dx = event.clientX - rect.left - rect.width / 2,
                    dy = event.clientY - rect.top - rect.height / 2
                const distance = Math.hypot(dx, dy),
                    pull = Math.max(0, 1 - distance / 72) ** 1.4 * 7
                geometry.current.pullX = distance ? (dx / distance) * pull : 0
                geometry.current.pullY = distance ? (dy / distance) * pull : 0
                wake.current()
            }}
            onPointerLeave={() => {
                geometry.current.pullX = 0
                geometry.current.pullY = 0
                wake.current()
            }}
        >
            <label
                ref={pill}
                className={cn(
                    "passui-search-pill control-field relative block h-11 max-w-full overflow-hidden rounded-full",
                    props.disabled && "opacity-40"
                )}
                style={{ width: expanded ? 320 : 44 }}
            >
                <SearchIcon
                    aria-hidden="true"
                    size={18}
                    className="pointer-events-none absolute top-1/2 start-[13px] -translate-y-1/2 text-label-secondary"
                />
                <input
                    {...props}
                    ref={(node) => {
                        input.current = node
                        if (typeof inputRef === "function") inputRef(node)
                        else if (inputRef) inputRef.current = node
                    }}
                    type="search"
                    placeholder={placeholder}
                    aria-label={
                        props["aria-labelledby"] ? undefined : (props["aria-label"] ?? placeholder)
                    }
                    className="h-11 w-full min-w-0 bg-transparent ps-11 pe-3 text-subheadline text-label outline-none placeholder:text-label-tertiary"
                    onFocus={(event) => {
                        setExpanded(true)
                        props.onFocus?.(event)
                    }}
                    onBlur={(event) => {
                        if (!event.currentTarget.value) setExpanded(false)
                        props.onBlur?.(event)
                    }}
                    onKeyDown={(event) => {
                        props.onKeyDown?.(event)
                        if (
                            !event.defaultPrevented &&
                            event.key === "Escape" &&
                            !event.currentTarget.value
                        ) {
                            setExpanded(false)
                            event.currentTarget.blur()
                        }
                    }}
                />
            </label>
        </div>
    )
}
