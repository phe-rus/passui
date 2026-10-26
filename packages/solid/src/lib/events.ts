import type { JSX } from "solid-js"

export function callHandler<T, E extends Event>(
    handler: JSX.EventHandlerUnion<T, E> | undefined,
    event: Parameters<JSX.EventHandler<T, E>>[0]
) {
    if (typeof handler === "function") handler(event)
    else if (handler) handler[0](handler[1], event)
}

export function callInputHandler<T, E extends InputEvent>(
    handler: JSX.InputEventHandlerUnion<T, E> | undefined,
    event: Parameters<JSX.InputEventHandler<T, E>>[0]
) {
    if (typeof handler === "function") handler(event)
    else if (handler) handler[0](handler[1], event)
}
