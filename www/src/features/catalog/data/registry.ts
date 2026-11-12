import { accordionDocs } from "./accordion/docs";
import { ambientDocs } from "./ambient/docs";
import { aspectRatioDocs } from "./aspect-ratio/docs";
import { breadcrumbDocs } from "./breadcrumb/docs";
import { buttonDocs } from "./button/docs";
import { chipDocs } from "./chip/docs";
import { codeBlockDocs } from "./code-block/docs";
import { comboBoxDocs } from "./combo-box/docs";
import { commandDocs } from "./command/docs";
import { compactDatePickerDocs } from "./compact-date-picker/docs";
import { compactTimePickerDocs } from "./compact-time-picker/docs";
import { contentUnavailableViewDocs } from "./content-unavailable-view/docs";
import { contentViewDocs } from "./content-view/docs";
import { contextMenuDocs } from "./context-menu/docs";
import { conversationDocs } from "./conversation/docs";
import { datePickerDocs } from "./date-picker/docs";
import { dialogDocs } from "./dialog/docs";
import { disclosureGroupDocs } from "./disclosure-group/docs";
import { dividerDocs } from "./divider/docs";
import { iconButtonDocs } from "./icon-button/docs";
import { inlineDisclosureDocs } from "./inline-disclosure/docs";
import { keyboardShortcutDocs } from "./keyboard-shortcut/docs";
import { labeledContentDocs } from "./labeled-content/docs";
import { localeSwitcherDocs } from "./locale-switcher/docs";
import { menuDocs } from "./menu/docs";
import { oneTimeCodeDocs } from "./one-time-code/docs";
import { pickerDocs } from "./picker/docs";
import { popoverDocs } from "./popover/docs";
import { profileImageDocs } from "./profile-image/docs";
import { progressViewDocs } from "./progress-view/docs";
import { radioGroupDocs } from "./radio-group/docs";
import { searchFieldDocs } from "./search-field/docs";
import { searchListDocs } from "./search-list/docs";
import { sectionDocs } from "./section/docs";
import { secureFieldDocs } from "./secure-field/docs";
import { segmentedControlDocs } from "./segmented-control/docs";
import { sheetDocs } from "./sheet/docs";
import { sidebarDocs } from "./sidebar/docs";
import { skeletonDocs } from "./skeleton/docs";
import { sliderDocs } from "./slider/docs";
import { sloshSliderDocs } from "./slosh-slider/docs";
import { statTileDocs } from "./stat-tile/docs";
import { statusIndicatorDocs } from "./status-indicator/docs";
import { stepperDocs } from "./stepper/docs";
import { swatchPickerDocs } from "./swatch-picker/docs";
import { tabBarDocs } from "./tab-bar/docs";
import { tabViewDocs } from "./tab-view/docs";
import { tableDocs } from "./table/docs";
import { textEditorDocs } from "./text-editor/docs";
import { textFieldDocs } from "./text-field/docs";
import { toastDocs } from "./toast/docs";
import { toggleDocs } from "./toggle/docs";
import { tooltipDocs } from "./tooltip/docs";
import type { RegisteredDocs } from "./types";
import { viewControllerDocs } from "./view-controller/docs";
import { wakeSliderDocs } from "./wake-slider/docs";

/** Every documented component. Add one line per docs file. */
export const registry: readonly RegisteredDocs[] = [
	aspectRatioDocs,
	oneTimeCodeDocs,
	wakeSliderDocs,
	sloshSliderDocs,
	commandDocs,
	skeletonDocs,
	breadcrumbDocs,
	radioGroupDocs,
	comboBoxDocs,
	contentUnavailableViewDocs,
	keyboardShortcutDocs,
	codeBlockDocs,
	accordionDocs,
	buttonDocs,
	iconButtonDocs,
	chipDocs,
	textFieldDocs,
	secureFieldDocs,
	searchFieldDocs,
	toggleDocs,
	menuDocs,
	disclosureGroupDocs,
	sliderDocs,
	stepperDocs,
	progressViewDocs,
	dividerDocs,
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
];

export {
	accordionDocs,
	ambientDocs,
	aspectRatioDocs,
	breadcrumbDocs,
	buttonDocs,
	chipDocs,
	codeBlockDocs,
	comboBoxDocs,
	commandDocs,
	compactDatePickerDocs,
	compactTimePickerDocs,
	contentUnavailableViewDocs,
	contentViewDocs,
	contextMenuDocs,
	conversationDocs,
	datePickerDocs,
	dialogDocs,
	disclosureGroupDocs,
	dividerDocs,
	iconButtonDocs,
	inlineDisclosureDocs,
	keyboardShortcutDocs,
	labeledContentDocs,
	localeSwitcherDocs,
	menuDocs,
	oneTimeCodeDocs,
	pickerDocs,
	popoverDocs,
	profileImageDocs,
	progressViewDocs,
	radioGroupDocs,
	searchFieldDocs,
	searchListDocs,
	sectionDocs,
	secureFieldDocs,
	segmentedControlDocs,
	sheetDocs,
	sidebarDocs,
	skeletonDocs,
	sliderDocs,
	sloshSliderDocs,
	statTileDocs,
	statusIndicatorDocs,
	stepperDocs,
	swatchPickerDocs,
	tabBarDocs,
	tableDocs,
	tabViewDocs,
	textEditorDocs,
	textFieldDocs,
	toastDocs,
	toggleDocs,
	tooltipDocs,
	viewControllerDocs,
	wakeSliderDocs,
};
