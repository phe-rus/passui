import { catalogIcons } from "@passui/react/icons"
import {
    buttonDocs,
    chipDocs,
    iconButtonDocs,
    labeledContentDocs,
    pickerDocs,
    searchFieldDocs,
    secureFieldDocs,
    sectionDocs,
    inlineDisclosureDocs,
    segmentedControlDocs,
    statTileDocs,
    statusIndicatorDocs,
    swatchPickerDocs,
    textFieldDocs,
    toggleDocs,
    sliderDocs,
    stepperDocs,
    progressViewDocs,
    dividerDocs,
    datePickerDocs,
    compactDatePickerDocs,
    compactTimePickerDocs,
    textEditorDocs,
    searchListDocs,
    profileImageDocs,
    tabViewDocs,
    tabBarDocs,
    sidebarDocs,
    viewControllerDocs,
    tableDocs,
    contentViewDocs,
    conversationDocs,
    ambientDocs,
    dialogDocs,
    sheetDocs,
    popoverDocs,
    toastDocs,
    contextMenuDocs,
    tooltipDocs,
    localeSwitcherDocs,
} from "@/domains/catalog/definitions"
import { buttonContent } from "./content/button"
import { chipContent } from "./content/chip"
import { iconButtonContent } from "./content/icon-button"
import { labeledContentContent } from "./content/labeled-content"
import { pickerContent } from "./content/picker"
import { searchFieldContent } from "./content/search-field"
import { secureFieldContent } from "./content/secure-field"
import { sectionContent } from "./content/section"
import { inlineDisclosureContent } from "./content/inline-disclosure"
import { segmentedControlContent } from "./content/segmented-control"
import { statTileContent } from "./content/stat-tile"
import { statusIndicatorContent } from "./content/status-indicator"
import { swatchPickerContent } from "./content/swatch-picker"
import { textFieldContent } from "./content/text-field"
import { toggleContent } from "./content/toggle"
import { sliderContent } from "./content/slider"
import { stepperContent } from "./content/stepper"
import { progressViewContent } from "./content/progress-view"
import { dividerContent } from "./content/divider"
import { compactDatePickerContent } from "./content/compact-date-picker"
import { compactTimePickerContent } from "./content/compact-time-picker"
import { datePickerContent } from "./content/date-picker"
import { textEditorContent } from "./content/text-editor"
import { searchListContent } from "./content/search-list"
import { profileImageContent } from "./content/profile-image"
import { tabViewContent } from "./content/tab-view"
import { tabBarContent } from "./content/tab-bar"
import { sidebarContent } from "./content/sidebar"
import { viewControllerContent } from "./content/view-controller"
import { tableContent } from "./content/table"
import { contentViewContent } from "./content/content-view"
import { conversationContent } from "./content/conversation"
import { ambientContent } from "./content/ambient"
import { dialogContent } from "./content/dialog"
import { sheetContent } from "./content/sheet"
import { popoverContent } from "./content/popover"
import { toastContent } from "./content/toast"
import { contextMenuContent } from "./content/context-menu"
import { tooltipContent } from "./content/tooltip"
import { localeSwitcherContent } from "./content/locale-switcher"
import type { CatalogEntry, CatalogGroup } from "./types"

// One line per documented component, grouped as the sidebar shows them.
const entries: CatalogEntry[] = [
    {
        group: "Controls",
        icon: catalogIcons.tap,
        docs: buttonDocs,
        content: buttonContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.settings,
        docs: iconButtonDocs,
        content: iconButtonContent,
    },
    {
        group: "Content",
        icon: catalogIcons.tag,
        docs: chipDocs,
        content: chipContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.input,
        docs: textFieldDocs,
        content: textFieldContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.password,
        docs: secureFieldDocs,
        content: secureFieldContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.search,
        docs: searchFieldDocs,
        content: searchFieldContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.toggle,
        docs: toggleDocs,
        content: toggleContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.analytics,
        docs: sliderDocs,
        content: sliderContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.columns,
        docs: stepperDocs,
        content: stepperContent,
    },
    {
        group: "Feedback",
        icon: catalogIcons.status,
        docs: progressViewDocs,
        content: progressViewContent,
    },
    {
        group: "Layout and disclosure",
        icon: catalogIcons.list,
        docs: dividerDocs,
        content: dividerContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.columns,
        docs: segmentedControlDocs,
        content: segmentedControlContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.unfold,
        docs: pickerDocs,
        content: pickerContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.colors,
        docs: swatchPickerDocs,
        content: swatchPickerContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.calendar,
        docs: datePickerDocs,
        content: datePickerContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.calendar,
        docs: compactDatePickerDocs,
        content: compactDatePickerContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.clock,
        docs: compactTimePickerDocs,
        content: compactTimePickerContent,
    },
    {
        group: "Content",
        icon: catalogIcons.text,
        docs: textEditorDocs,
        content: textEditorContent,
    },
    {
        group: "Content",
        icon: catalogIcons.searchList,
        docs: searchListDocs,
        content: searchListContent,
    },
    {
        group: "Layout and disclosure",
        icon: catalogIcons.list,
        docs: sectionDocs,
        content: sectionContent,
    },
    {
        group: "Layout and disclosure",
        icon: catalogIcons.unfold,
        docs: inlineDisclosureDocs,
        content: inlineDisclosureContent,
    },
    {
        group: "Layout and disclosure",
        icon: catalogIcons.label,
        docs: labeledContentDocs,
        content: labeledContentContent,
    },
    {
        group: "Content",
        icon: catalogIcons.table,
        docs: tableDocs,
        content: tableContent,
    },
    {
        group: "Compositions",
        icon: catalogIcons.cards,
        docs: contentViewDocs,
        content: contentViewContent,
    },
    {
        group: "Compositions",
        icon: catalogIcons.message,
        docs: conversationDocs,
        content: conversationContent,
    },
    {
        group: "Compositions",
        icon: catalogIcons.sun,
        docs: ambientDocs,
        content: ambientContent,
    },
    {
        group: "Feedback",
        icon: catalogIcons.status,
        docs: statusIndicatorDocs,
        content: statusIndicatorContent,
    },
    {
        group: "Feedback",
        icon: catalogIcons.analytics,
        docs: statTileDocs,
        content: statTileContent,
    },
    {
        group: "Presentation",
        icon: catalogIcons.alert,
        docs: dialogDocs,
        content: dialogContent,
    },
    {
        group: "Presentation",
        icon: catalogIcons.panel,
        docs: sheetDocs,
        content: sheetContent,
    },
    {
        group: "Presentation",
        icon: catalogIcons.bubble,
        docs: popoverDocs,
        content: popoverContent,
    },
    {
        group: "Feedback",
        icon: catalogIcons.notification,
        docs: toastDocs,
        content: toastContent,
    },
    {
        group: "Presentation",
        icon: catalogIcons.menu,
        docs: contextMenuDocs,
        content: contextMenuContent,
    },
    {
        group: "Presentation",
        icon: catalogIcons.help,
        docs: tooltipDocs,
        content: tooltipContent,
    },
    {
        group: "Controls",
        icon: catalogIcons.translate,
        docs: localeSwitcherDocs,
        content: localeSwitcherContent,
    },
    {
        group: "Navigation",
        icon: catalogIcons.layoutTop,
        docs: tabViewDocs,
        content: tabViewContent,
    },
    {
        group: "Navigation",
        icon: catalogIcons.layoutBottom,
        docs: tabBarDocs,
        content: tabBarContent,
    },
    {
        group: "Navigation",
        icon: catalogIcons.sidebar,
        docs: sidebarDocs,
        content: sidebarContent,
    },
    {
        group: "Navigation",
        icon: catalogIcons.browser,
        docs: viewControllerDocs,
        content: viewControllerContent,
    },
    {
        group: "Content",
        icon: catalogIcons.user,
        docs: profileImageDocs,
        content: profileImageContent,
    },
]

export const catalogGroups: readonly CatalogGroup[] = [
    "Controls",
    "Layout and disclosure",
    "Navigation",
    "Presentation",
    "Feedback",
    "Content",
    "Compositions",
]

export function getCatalog(): readonly CatalogEntry[] {
    return entries
}

export function getEntry(slug: string): CatalogEntry | undefined {
    return entries.find((entry) => entry.docs.slug === slug)
}

/** The components before and after this one, in sidebar order. */
export function getNeighbours(slug: string) {
    const index = entries.findIndex((entry) => entry.docs.slug === slug)
    return {
        previous: index > 0 ? entries[index - 1] : undefined,
        next: index >= 0 ? entries[index + 1] : undefined,
    }
}
