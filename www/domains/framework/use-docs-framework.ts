import { useLocation } from "@tanstack/react-router"
import { getFramework } from "./framework"

export function useDocsFramework() {
    return useLocation({
        select: (location) => getFramework(location.pathname),
    })
}
