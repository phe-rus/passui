import { expect, test } from "vitest"
import { getSolidExampleSource } from "@/domains/framework/get-solid-example-source"
import { getCatalog } from "@/domains/catalog/get-catalog"
import { hasSolidComponent } from "@passui/solid/docs"
import {
    getSolidComponentMarkdown,
    getSolidLlmsTxt,
    getSolidSkillMarkdown,
} from "@/domains/ai-context/get-ai-context"
import { getEntry } from "@/domains/catalog/get-catalog"

test("Solid Ambient examples show image-driven glow instead of empty surfaces", () => {
    for (const id of ["usage", "images", "now-playing"]) {
        const source = getSolidExampleSource("ambient", id)
        expect(source).toContain("<Ambient")
        expect(source).toContain("src=")
        expect(source).toContain("@passui/solid/ambient")
        expect(source).not.toContain("@jsxImportSource")
    }
})

test("Solid documentation only presents existing native example sources", () => {
    expect(
        getSolidExampleSource("button", "pending")
    ).toContain("@passui/solid/button")
    expect(
        getSolidExampleSource("ambient", "nonexistent")
    ).toBe("")
})

test("all React showcase scenes have matching native Solid hero previews", () => {
    const components = [
        "ambient",
        "button",
        "chip",
        "compact-date-picker",
        "compact-time-picker",
        "content-view",
        "context-menu",
        "conversation",
        "date-picker",
        "dialog",
        "labeled-content",
        "locale-switcher",
        "picker",
        "popover",
        "profile-image",
        "search-field",
        "search-list",
        "section",
        "secure-field",
        "segmented-control",
        "sheet",
        "sidebar",
        "stat-tile",
        "status-indicator",
        "swatch-picker",
        "tab-bar",
        "tab-view",
        "table",
        "text-editor",
        "text-field",
        "toast",
        "toggle",
        "tooltip",
        "view-controller",
    ]
    for (const component of components) {
        const source = getSolidExampleSource(
            component,
            "showcase"
        )
        expect(source, `${component} showcase`).toContain(
            "@passui/solid/"
        )
        expect(source, `${component} showcase`).not.toContain(
            "@passui/react"
        )
    }
    expect(
        getSolidExampleSource("icon-button", "showcase")
    ).toContain("IconButtonShowcase")
})

test("Solid variants are native examples rather than React snippets", () => {
    for (const [slug, variants] of [
        ["chip", ["tones", "in-rows"]],
        ["status-indicator", ["states", "live"]],
        ["labeled-content", ["descriptions", "wide"]],
    ] as const) {
        for (const id of variants) {
            const source = getSolidExampleSource(slug, id)
            expect(source).toContain(`@passui/solid/${slug}`)
            expect(source).not.toContain("@jsxImportSource")
        }
    }
})

test("every React catalog scenario has a copyable native Solid example", () => {
    const missing: string[] = []
    for (const entry of getCatalog()) {
        if (!hasSolidComponent(entry.docs.slug)) continue
        const ids = [
            "usage",
            ...Object.keys(entry.content.examples),
        ]
        for (const id of ids) {
            const source = getSolidExampleSource(
                entry.docs.slug,
                id
            )
            if (!source)
                missing.push(`${entry.docs.slug}/${id}`)
            else if (source.includes("@jsxImportSource")) {
                missing.push(
                    `${entry.docs.slug}/${id} has a JSX directive`
                )
            }
        }
    }
    expect(missing).toEqual([])
})

test("Solid AI documentation uses native examples and links", () => {
    const entry = getEntry("button")
    expect(entry).toBeDefined()
    const markdown = getSolidComponentMarkdown(
        entry!,
        "https://passui.pherus.org"
    )
    expect(markdown).toContain("@passui/solid/button")
    expect(markdown).toContain("/components/solid/button")
    expect(markdown).not.toContain("@passui/react/button")
    expect(markdown).not.toContain("@jsxImportSource")

    const skill = getSolidSkillMarkdown(
        "https://passui.pherus.org"
    )
    expect(skill).toContain("createSignal")
    expect(skill).toContain(
        "bunx @passui/cli init --framework solid"
    )
    expect(skill).toContain("@passui/tanstack/solid/")
    expect(
        getSolidLlmsTxt("https://passui.pherus.org")
    ).toContain("/components/solid/button")
})

test("key Solid scenarios teach the same use cases as React", () => {
    for (const [slug, id, phrases] of [
        [
            "button",
            "with-icon",
            ["Email", "Download", "Delete"],
        ],
        ["button", "link", ["Read the guide"]],
        [
            "dialog",
            "form",
            ["Rename project", "Pass console"],
        ],
        [
            "section",
            "actions",
            ["Export my data", "Clear cache"],
        ],
        [
            "stat-tile",
            "filters",
            ["All requests", "Open", "Waiting on you"],
        ],
        [
            "tooltip",
            "shortcuts",
            ["Bold", "Italic", "Underline"],
        ],
        [
            "table",
            "selection",
            [
                "MacBook Air",
                "iPhone 16",
                "iPad mini",
                "Sign out",
            ],
        ],
        [
            "table",
            "invoices",
            ["INV-104", "INV-105", "INV-106", "Total"],
        ],
        [
            "sheet",
            "share",
            [
                "Share note",
                "People with the link can edit",
                "Copy link",
            ],
        ],
        [
            "sheet",
            "choices",
            ["Language", "Français", "日本語"],
        ],
        [
            "dialog",
            "confirm",
            ["Delete this app?", "App deleted"],
        ],
        [
            "popover",
            "menu",
            ["Duplicate", "Move to folder", "Export as PDF"],
        ],
        [
            "popover",
            "help",
            ["Redirect URI", "Where Pass sends people back"],
        ],
        [
            "search-list",
            "groups",
            [
                "Passkeys",
                "Two-step verification",
                "Appearance",
            ],
        ],
        [
            "search-list",
            "dropdown",
            ["Password", "Devices", "Privacy"],
        ],
        [
            "tab-view",
            "settings",
            ["Notifications", "Sounds", "Badges", "Private"],
        ],
        [
            "tab-view",
            "keyboard",
            ["Design review at 10:00", "Retro and planning"],
        ],
        [
            "sidebar",
            "unread",
            ["Mailboxes", "Inbox", "Mark all as read"],
        ],
        [
            "toggle",
            "settings",
            ["Sync across devices", "Sounds"],
        ],
        [
            "toggle",
            "checkboxes",
            ["Pick a palette", "Review copy", "Ship it"],
        ],
        [
            "status-indicator",
            "states",
            ["All changes saved", "Syncing 3 notes"],
        ],
        [
            "segmented-control",
            "views",
            ["sign-ins this", "Month"],
        ],
        [
            "profile-image",
            "group",
            ["/avatars/aiko.svg", "+4"],
        ],
        [
            "picker",
            "searchable",
            ["Africa/Nairobi", "Search cities"],
        ],
        [
            "context-menu",
            "checked",
            ["Recently edited", "Date created"],
        ],
        [
            "labeled-content",
            "descriptions",
            ["Sign-in alerts", "Weekly digest"],
        ],
        [
            "date-picker",
            "past-only",
            ["Birthday", "can't be in the future"],
        ],
        [
            "search-field",
            "filter",
            [
                "Pass console",
                "Notables",
                "No applications match",
            ],
        ],
        [
            "swatch-picker",
            "labels",
            ["Weekend trip", "Tag color"],
        ],
        [
            "text-field",
            "validation",
            ["aiko@", "Enter a full email address."],
        ],
        [
            "conversation",
            "days",
            [
                "Did the release go out?",
                "Celebrating at lunch?",
            ],
        ],
        [
            "conversation",
            "composer",
            ["Write a reply", "Ctrl/Cmd+Enter", "Sent:"],
        ],
        [
            "locale-switcher",
            "native-names",
            [
                "Change language",
                "docs-locale-switcher-native-names",
            ],
        ],
        [
            "picker",
            "details",
            [
                "Where your account's data is stored.",
                "Frankfurt",
                "Virginia",
            ],
        ],
        [
            "section",
            "groups",
            ["Two-step verification", "Recovery email"],
        ],
        [
            "segmented-control",
            "overflow",
            ["Recently edited", "Date created"],
        ],
        [
            "text-editor",
            "comment",
            [
                "Add a comment",
                "Share your thoughts",
                "Comment posted",
            ],
        ],
        [
            "toast",
            "promise",
            [
                "Upload while offline",
                "photo.jpg",
                "Upload failed",
            ],
        ],
        [
            "toast",
            "action",
            ["Archive note", "Note archived", "Undo"],
        ],
        [
            "search-list",
            "usage",
            ["Apple", "Banana", "No fruit found"],
        ],
        [
            "context-menu",
            "list",
            ["Trip to Kyoto", "Groceries", "Book club picks"],
        ],
        [
            "icon-button",
            "player",
            ["Previous", "Pause", "Next"],
        ],
        [
            "picker",
            "usage",
            ["Sort by", "Most recent", "Name"],
        ],
        [
            "tab-view",
            "usage",
            [
                "Profile",
                "Security",
                "Your password and passkeys.",
            ],
        ],
        [
            "content-view",
            "usage",
            [
                "Passkeys",
                "Sign in with your face or fingerprint.",
            ],
        ],
        [
            "segmented-control",
            "usage",
            ["Appearance", "Light", "Dark", "Auto"],
        ],
        [
            "button",
            "disabled",
            ["I agree to the terms", "Create account"],
        ],
        [
            "dialog",
            "usage",
            [
                "Sign out of Pass?",
                "You can sign back in at any time.",
            ],
        ],
        [
            "tooltip",
            "usage",
            ["Download", "Saves a copy to your downloads"],
        ],
        ["icon-button", "usage", ["Settings", "ghost"]],
        [
            "button",
            "usage",
            ["Save changes", "Changes saved"],
        ],
        ["toggle", "usage", ["Wi-Fi", "enabled"]],
        [
            "secure-field",
            "usage",
            ["Password", "current-password"],
        ],
        [
            "text-editor",
            "usage",
            ["Bio", "A few words about you"],
        ],
        [
            "date-picker",
            "usage",
            ["Birthday", "Enter a real date."],
        ],
        [
            "date-picker",
            "locales",
            ["United States", "United Kingdom", "China"],
        ],
        [
            "locale-switcher",
            "translated-page",
            ["Connexion", "Continuer", "登录"],
        ],
        [
            "text-field",
            "icons",
            ["aiko@example.com", "Website", "Find a member"],
        ],
        [
            "secure-field",
            "new-password",
            [
                "Confirm password",
                "The passwords don't match.",
                "Change password",
            ],
        ],
        [
            "tooltip",
            "icon-buttons",
            ["Copy", "Share", "Delete"],
        ],
        [
            "table",
            "usage",
            ["Aiko Kamado", "Kenji Mori", "Owner", "Admin"],
        ],
        [
            "table",
            "wide",
            ["Passkey added", "MacBook Air", "Lisbon, PT"],
        ],
        [
            "table",
            "empty",
            ["No applications yet", "New application"],
        ],
        [
            "stat-tile",
            "grid",
            [
                "Signed in now",
                "Failed sign-ins",
                "Across 3 apps",
            ],
        ],
        [
            "content-view",
            "header-action",
            [
                "Passkeys",
                "2 passkeys on your devices.",
                "Add",
            ],
        ],
        [
            "view-controller",
            "settings",
            ["Personal info", "Aiko Kamado", "Birthday"],
        ],
        [
            "labeled-content",
            "usage",
            [
                "Show previews",
                "Shows the first lines of each note.",
            ],
        ],
        [
            "labeled-content",
            "values",
            ["pass_7f3a9c", "Family", "March 2024"],
        ],
        [
            "labeled-content",
            "wide",
            ["Appearance", "Nickname", "Aiko"],
        ],
        [
            "status-indicator",
            "live",
            [
                "Trip to Kyoto",
                "Note title",
                "Saving",
                "Saved",
            ],
        ],
        [
            "stat-tile",
            "usage",
            ["Active people", "This week"],
        ],
        [
            "dialog",
            "inline",
            [
                "Add a recovery email",
                "We only use it if you lose access.",
            ],
        ],
        [
            "section",
            "usage",
            ["Aiko Kamado", "aiko@example.com"],
        ],
        [
            "chip",
            "in-rows",
            [
                "Aiko Kamado",
                "Kenji Mori",
                "Anyone with the link",
            ],
        ],
        [
            "context-menu",
            "usage",
            [
                "Copy link",
                "Open in new tab",
                "Right-click this card",
            ],
        ],
        [
            "compact-time-picker",
            "usage",
            ["18:30", "AM or PM"],
        ],
        [
            "search-field",
            "toolbar",
            ["Search people", "Filters", "Invite"],
        ],
        [
            "ambient",
            "now-playing",
            [
                "Morning Light",
                "Kenji Mori",
                "Previous",
                "Next",
            ],
        ],
        [
            "content-view",
            "stats",
            ["This month", "1,284", "with passkeys"],
        ],
        [
            "popover",
            "usage",
            ["What's this?", "A passkey signs you in"],
        ],
        [
            "sheet",
            "usage",
            [
                "About this app",
                "Version 2.4. Made in Lisbon.",
            ],
        ],
        [
            "view-controller",
            "usage",
            ["Devices", "Where you're signed in right now."],
        ],
        [
            "tab-bar",
            "five-tabs",
            ["Calendar", "Library", "Profile"],
        ],
        [
            "tab-bar",
            "minimize",
            ["Chapter", "Search", "Library"],
        ],
        [
            "profile-image",
            "fallbacks",
            [
                "/avatars/kenji.svg",
                "/avatars/missing.png",
                "KM",
                "MP",
            ],
        ],
        ["sidebar", "usage", ["Home", "Settings"]],
        [
            "chip",
            "tones",
            ["Draft", "Featured", "Family", "Friends"],
        ],
        [
            "secure-field",
            "reveal",
            ["correct-horse", "Password"],
        ],
    ] as const) {
        const source = getSolidExampleSource(slug, id)
        for (const phrase of phrases)
            expect(source).toContain(phrase)
    }
})
