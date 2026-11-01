import { useEffect, useState } from "react"

const PENDING_INDICATOR_DELAY = 300

export function schedulePendingIndicator(onShow: () => void) {
    const timeout = setTimeout(onShow, PENDING_INDICATOR_DELAY)
    return () => clearTimeout(timeout)
}

export function usePendingIndicator(isPending: boolean) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(false)

        if (!isPending) return

        return schedulePendingIndicator(() => setIsVisible(true))
    }, [isPending])

    return isPending && isVisible
}
