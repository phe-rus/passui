import {
    Analytics01Icon,
    Calendar03Icon,
    Clock01Icon,
    ColorsIcon,
    InputTextIcon,
    LabelIcon,
    LayoutTwoColumnIcon,
    ListViewIcon,
    LockPasswordIcon,
    Search01Icon,
    SearchList01Icon,
    Settings02Icon,
    StatusIcon,
    Tag01Icon,
    Tap01Icon,
    TextAlignLeftIcon,
    ToggleOnIcon,
    UnfoldMoreIcon,
    UserCircleIcon,
    LayoutTopIcon,
    LayoutBottomIcon,
    SidebarLeftIcon,
    BrowserIcon,
    Table01Icon,
    CardsIcon,
    Message01Icon,
    Sun03Icon,
    AlertSquareIcon,
    PanelBottomIcon,
    BubbleChatIcon,
    Notification03Icon,
    MenuSquareIcon,
    HelpCircleIcon,
    TranslateIcon,
} from "@hugeicons/core-free-icons"
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
} from "@passui/react/docs"
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
        icon: Tap01Icon,
        docs: buttonDocs,
        content: buttonContent,
    },
    {
        group: "Controls",
        icon: Settings02Icon,
        docs: iconButtonDocs,
        content: iconButtonContent,
    },
    {
        group: "Content",
        icon: Tag01Icon,
        docs: chipDocs,
        content: chipContent,
    },
    {
        group: "Controls",
        icon: InputTextIcon,
        docs: textFieldDocs,
        content: textFieldContent,
    },
    {
        group: "Controls",
        icon: LockPasswordIcon,
        docs: secureFieldDocs,
        content: secureFieldContent,
    },
    {
        group: "Controls",
        icon: Search01Icon,
        docs: searchFieldDocs,
        content: searchFieldContent,
    },
    {
        group: "Controls",
        icon: ToggleOnIcon,
        docs: toggleDocs,
        content: toggleContent,
    },
    {
        group: "Controls",
        icon: LayoutTwoColumnIcon,
        docs: segmentedControlDocs,
        content: segmentedControlContent,
    },
    {
        group: "Controls",
        icon: UnfoldMoreIcon,
        docs: pickerDocs,
        content: pickerContent,
    },
    {
        group: "Controls",
        icon: ColorsIcon,
        docs: swatchPickerDocs,
        content: swatchPickerContent,
    },
    {
        group: "Controls",
        icon: Calendar03Icon,
        docs: datePickerDocs,
        content: datePickerContent,
    },
    {
        group: "Controls",
        icon: Calendar03Icon,
        docs: compactDatePickerDocs,
        content: compactDatePickerContent,
    },
    {
        group: "Controls",
        icon: Clock01Icon,
        docs: compactTimePickerDocs,
        content: compactTimePickerContent,
    },
    {
        group: "Content",
        icon: TextAlignLeftIcon,
        docs: textEditorDocs,
        content: textEditorContent,
    },
    {
        group: "Content",
        icon: SearchList01Icon,
        docs: searchListDocs,
        content: searchListContent,
    },
    {
        group: "Layout and disclosure",
        icon: ListViewIcon,
        docs: sectionDocs,
        content: sectionContent,
    },
    {
        group: "Layout and disclosure",
        icon: UnfoldMoreIcon,
        docs: inlineDisclosureDocs,
        content: inlineDisclosureContent,
    },
    {
        group: "Layout and disclosure",
        icon: LabelIcon,
        docs: labeledContentDocs,
        content: labeledContentContent,
    },
    {
        group: "Content",
        icon: Table01Icon,
        docs: tableDocs,
        content: tableContent,
    },
    {
        group: "Compositions",
        icon: CardsIcon,
        docs: contentViewDocs,
        content: contentViewContent,
    },
    {
        group: "Compositions",
        icon: Message01Icon,
        docs: conversationDocs,
        content: conversationContent,
    },
    {
        group: "Compositions",
        icon: Sun03Icon,
        docs: ambientDocs,
        content: ambientContent,
    },
    {
        group: "Feedback",
        icon: StatusIcon,
        docs: statusIndicatorDocs,
        content: statusIndicatorContent,
    },
    {
        group: "Feedback",
        icon: Analytics01Icon,
        docs: statTileDocs,
        content: statTileContent,
    },
    {
        group: "Presentation",
        icon: AlertSquareIcon,
        docs: dialogDocs,
        content: dialogContent,
    },
    {
        group: "Presentation",
        icon: PanelBottomIcon,
        docs: sheetDocs,
        content: sheetContent,
    },
    {
        group: "Presentation",
        icon: BubbleChatIcon,
        docs: popoverDocs,
        content: popoverContent,
    },
    {
        group: "Feedback",
        icon: Notification03Icon,
        docs: toastDocs,
        content: toastContent,
    },
    {
        group: "Presentation",
        icon: MenuSquareIcon,
        docs: contextMenuDocs,
        content: contextMenuContent,
    },
    {
        group: "Presentation",
        icon: HelpCircleIcon,
        docs: tooltipDocs,
        content: tooltipContent,
    },
    {
        group: "Controls",
        icon: TranslateIcon,
        docs: localeSwitcherDocs,
        content: localeSwitcherContent,
    },
    {
        group: "Navigation",
        icon: LayoutTopIcon,
        docs: tabViewDocs,
        content: tabViewContent,
    },
    {
        group: "Navigation",
        icon: LayoutBottomIcon,
        docs: tabBarDocs,
        content: tabBarContent,
    },
    {
        group: "Navigation",
        icon: SidebarLeftIcon,
        docs: sidebarDocs,
        content: sidebarContent,
    },
    {
        group: "Navigation",
        icon: BrowserIcon,
        docs: viewControllerDocs,
        content: viewControllerContent,
    },
    {
        group: "Content",
        icon: UserCircleIcon,
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

export function getEntry(
    slug: string
): CatalogEntry | undefined {
    return entries.find((entry) => entry.docs.slug === slug)
}

/** The components before and after this one, in sidebar order. */
export function getNeighbours(slug: string) {
    const index = entries.findIndex(
        (entry) => entry.docs.slug === slug
    )
    return {
        previous: index > 0 ? entries[index - 1] : undefined,
        next: index >= 0 ? entries[index + 1] : undefined,
    }
}
