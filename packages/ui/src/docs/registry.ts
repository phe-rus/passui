import { buttonDocs } from "../components/button/button.docs"
import { iconButtonDocs } from "../components/button/icon-button.docs"
import { chipDocs } from "../components/chip/chip.docs"
import { labeledContentDocs } from "../components/labeled-content/labeled-content.docs"
import { pickerDocs } from "../components/picker/picker.docs"
import { searchFieldDocs } from "../components/search-field/search-field.docs"
import { secureFieldDocs } from "../components/secure-field/secure-field.docs"
import { sectionDocs } from "../components/section/section.docs"
import { inlineDisclosureDocs } from "../components/inline-disclosure/inline-disclosure.docs"
import { segmentedControlDocs } from "../components/segmented-control/segmented-control.docs"
import { statTileDocs } from "../components/stat-tile/stat-tile.docs"
import { statusIndicatorDocs } from "../components/status-indicator/status-indicator.docs"
import { swatchPickerDocs } from "../components/swatch-picker/swatch-picker.docs"
import { textFieldDocs } from "../components/text-field/text-field.docs"
import { toggleDocs } from "../components/toggle/toggle.docs"
import { compactDatePickerDocs } from "../components/compact-date-picker/compact-date-picker.docs"
import { compactTimePickerDocs } from "../components/compact-time-picker/compact-time-picker.docs"
import { datePickerDocs } from "../components/date-picker/date-picker.docs"
import { textEditorDocs } from "../components/text-editor/text-editor.docs"
import { searchListDocs } from "../components/search-list/search-list.docs"
import { profileImageDocs } from "../components/profile-image/profile-image.docs"
import { tabViewDocs } from "../components/tab-view/tab-view.docs"
import { tabBarDocs } from "../components/tab-bar/tab-bar.docs"
import { sidebarDocs } from "../components/sidebar/sidebar.docs"
import { viewControllerDocs } from "../components/view-controller/view-controller.docs"
import { tableDocs } from "../components/table/table.docs"
import { contentViewDocs } from "../components/content-view/content-view.docs"
import { conversationDocs } from "../components/conversation/conversation.docs"
import { ambientDocs } from "../components/ambient/ambient.docs"
import { dialogDocs } from "../components/dialog/dialog.docs"
import { sheetDocs } from "../components/sheet/sheet.docs"
import { popoverDocs } from "../components/popover/popover.docs"
import { toastDocs } from "../components/toast/toast.docs"
import { contextMenuDocs } from "../components/context-menu/context-menu.docs"
import { tooltipDocs } from "../components/tooltip/tooltip.docs"
import { localeSwitcherDocs } from "../components/locale-switcher/locale-switcher.docs"
import type { RegisteredDocs } from "./types"

/** Every documented component. Add one line per docs file. */
export const registry: readonly RegisteredDocs[] = [
    buttonDocs,
    iconButtonDocs,
    chipDocs,
    textFieldDocs,
    secureFieldDocs,
    searchFieldDocs,
    toggleDocs,
    segmentedControlDocs,
    pickerDocs,
    swatchPickerDocs,
    sectionDocs,
    inlineDisclosureDocs,
    labeledContentDocs,
    statusIndicatorDocs,
    statTileDocs,
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
]

export {
    dialogDocs,
    sheetDocs,
    popoverDocs,
    toastDocs,
    contextMenuDocs,
    tooltipDocs,
    localeSwitcherDocs,
    tableDocs,
    contentViewDocs,
    conversationDocs,
    ambientDocs,
    tabViewDocs,
    tabBarDocs,
    sidebarDocs,
    viewControllerDocs,
    datePickerDocs,
    compactDatePickerDocs,
    compactTimePickerDocs,
    textEditorDocs,
    searchListDocs,
    profileImageDocs,
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
}
