import {
    HomeIcon,
    LibraryIcon,
    PersonIcon,
} from "@passui/react/icons"
import { TabBarFiveTabs } from "./examples/tab-bar-five-tabs"

import { useState } from "react"
import { defineDocs } from "../../docs/types"
import { TabBarMinimize } from "./examples/tab-bar-minimize"
import { TabBarShowcase } from "./examples/tab-bar-showcase"
import { TabBarUsage } from "./examples/tab-bar-usage"
import { TabBar } from "./tab-bar"

// The tabs and the search button are objects, so the playground picks
// the active tab and switches search on; the snippet writes the rest.
type DemoProps = {
    label: string
    active: "home" | "library" | "profile"
    search: boolean
}

const tabs = [
    {
        id: "home",
        label: "Home",
        icon: <HomeIcon size={22} />,
    },
    {
        id: "library",
        label: "Library",
        icon: <LibraryIcon size={22} />,
    },
    {
        id: "profile",
        label: "Profile",
        icon: <PersonIcon size={22} />,
    },
] as const

function TabBarDemo({ label, active, search }: DemoProps) {
    const [current, setCurrent] =
        useState<DemoProps["active"]>(active)
    return (
        <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-5xl bg-fill/40">
            <TabBar
                label={label}
                tabs={tabs}
                active={current}
                search={
                    search
                        ? {
                              label: "Search",
                              onPress: () => {},
                          }
                        : undefined
                }
                className="absolute inset-x-3 bottom-3"
                renderLink={(tab, props) => (
                    <a
                        key={tab.id}
                        href={`#${tab.id}`}
                        {...props}
                        onClick={(event) => {
                            event.preventDefault()
                            setCurrent(tab.id)
                        }}
                    />
                )}
            />
        </div>
    )
}

export const tabBarDocs = defineDocs<DemoProps>()({
    slug: "tab-bar",
    name: "TabBar",
    importPath: "@passui/react",
    controls: {
        label: {
            kind: "text",
            default: "Main",
            required: true,
        },
        active: {
            kind: "select",
            options: {
                home: true,
                library: true,
                profile: true,
            },
            default: "home",
        },
        search: { kind: "boolean", default: true },
    },
    render: (values) => (
        <TabBarDemo key={values.active} {...values} />
    ),
    childrenSnippet: ({ search }) => ({
        imports: [
            'import { HomeIcon, LibraryIcon, PersonIcon } from "@passui/react/icons"',
            `import { Link, useLocation${search ? ", useNavigate" : ""} } from "@tanstack/react-router"`,
        ],
        setup: [
            "const tabs = [",
            '    { id: "/", label: "Home", icon: <HomeIcon size={22} /> },',
            '    { id: "/library", label: "Library", icon: <LibraryIcon size={22} /> },',
            '    { id: "/profile", label: "Profile", icon: <PersonIcon size={22} /> },',
            "]",
            "const { pathname } = useLocation()",
            ...(search
                ? ["const navigate = useNavigate()"]
                : []),
        ],
        children: "",
        omit: ["active", "search"],
        expressionProps: {
            tabs: "tabs",
            active: "pathname",
            ...(search
                ? {
                      search: '{ label: "Search", onPress: () => navigate({ to: "/search" }) }',
                  }
                : {}),
            renderLink:
                "(tab, props) => <Link key={tab.id} to={tab.id} {...props} />",
        },
    }),
    usage: TabBarUsage,
    showcase: TabBarShowcase,
    examples: [
        { id: "minimize", component: TabBarMinimize },
        { id: "five-tabs", component: TabBarFiveTabs },
    ],
})
