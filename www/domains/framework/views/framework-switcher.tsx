import type { ReactNode } from "react"
import { TabView } from "@passui/react/tab-view"
import {
    useLocation,
    useNavigate,
} from "@tanstack/react-router"
import {
    frameworkOptions,
    frameworkPath,
    getFramework,
} from "../framework"

export function FrameworkSwitcher({
    children,
}: {
    children: ReactNode
}) {
    const pathname = useLocation({
        select: (location) => location.pathname,
    })
    const selected = getFramework(pathname)
    const navigate = useNavigate()
    // The introduction and component catalog describe Passui as a whole.
    // Framework switching belongs on implementation-specific pages.
    if (
        pathname.endsWith("/docs/introduction") ||
        pathname === "/components" ||
        pathname === "/solid/components" ||
        pathname.startsWith("/components/")
    ) {
        return <>{children}</>
    }
    return (
        <TabView
            options={frameworkOptions}
            defaultValue="react"
            value={selected}
            align="start"
            label="Documentation framework"
            className="gap-8"
            onValueChange={(framework) =>
                void navigate({
                    to: frameworkPath(pathname, framework),
                    search: {},
                })
            }
        >
            {() => children}
        </TabView>
    )
}
