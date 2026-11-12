import { aspectRatioContent } from "../data/aspect-ratio/content";
import { aspectRatioDocs } from "../data/aspect-ratio/docs";
import { oneTimeCodeContent } from "../data/one-time-code/content";
import { oneTimeCodeDocs } from "../data/one-time-code/docs";
import { wakeSliderContent } from "../data/wake-slider/content";
import { wakeSliderDocs } from "../data/wake-slider/docs";
import { sloshSliderContent } from "../data/slosh-slider/content";
import { sloshSliderDocs } from "../data/slosh-slider/docs";
import { commandContent } from "../data/command/content";
import { commandDocs } from "../data/command/docs";
import { skeletonContent } from "../data/skeleton/content";
import { breadcrumbContent } from "../data/breadcrumb/content";
import { radioGroupContent } from "../data/radio-group/content";
import { comboBoxContent } from "../data/combo-box/content";
import { contentUnavailableViewContent } from "../data/content-unavailable-view/content";
import { keyboardShortcutContent } from "../data/keyboard-shortcut/content";
import { codeBlockContent } from "../data/code-block/content";
import { componentTitle } from "./navigation";
import { catalogIcons } from "@passui/react/icons";
import {
	skeletonDocs,
	breadcrumbDocs,
	radioGroupDocs,
	comboBoxDocs,
	contentUnavailableViewDocs,
	keyboardShortcutDocs,
	codeBlockDocs,
	accordionDocs,
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
	menuDocs,
	disclosureGroupDocs,
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
} from "@/features/catalog/data";
import { buttonContent } from "../data/button/content";
import { accordionContent } from "../data/accordion/content";
import { chipContent } from "../data/chip/content";
import { iconButtonContent } from "../data/icon-button/content";
import { labeledContentContent } from "../data/labeled-content/content";
import { pickerContent } from "../data/picker/content";
import { searchFieldContent } from "../data/search-field/content";
import { secureFieldContent } from "../data/secure-field/content";
import { sectionContent } from "../data/section/content";
import { inlineDisclosureContent } from "../data/inline-disclosure/content";
import { segmentedControlContent } from "../data/segmented-control/content";
import { statTileContent } from "../data/stat-tile/content";
import { statusIndicatorContent } from "../data/status-indicator/content";
import { swatchPickerContent } from "../data/swatch-picker/content";
import { textFieldContent } from "../data/text-field/content";
import { toggleContent } from "../data/toggle/content";
import { menuContent } from "../data/menu/content";
import { disclosureGroupContent } from "../data/disclosure-group/content";
import { sliderContent } from "../data/slider/content";
import { stepperContent } from "../data/stepper/content";
import { progressViewContent } from "../data/progress-view/content";
import { dividerContent } from "../data/divider/content";
import { compactDatePickerContent } from "../data/compact-date-picker/content";
import { compactTimePickerContent } from "../data/compact-time-picker/content";
import { datePickerContent } from "../data/date-picker/content";
import { textEditorContent } from "../data/text-editor/content";
import { searchListContent } from "../data/search-list/content";
import { profileImageContent } from "../data/profile-image/content";
import { tabViewContent } from "../data/tab-view/content";
import { tabBarContent } from "../data/tab-bar/content";
import { sidebarContent } from "../data/sidebar/content";
import { viewControllerContent } from "../data/view-controller/content";
import { tableContent } from "../data/table/content";
import { contentViewContent } from "../data/content-view/content";
import { conversationContent } from "../data/conversation/content";
import { ambientContent } from "../data/ambient/content";
import { dialogContent } from "../data/dialog/content";
import { sheetContent } from "../data/sheet/content";
import { popoverContent } from "../data/popover/content";
import { toastContent } from "../data/toast/content";
import { contextMenuContent } from "../data/context-menu/content";
import { tooltipContent } from "../data/tooltip/content";
import { localeSwitcherContent } from "../data/locale-switcher/content";
import type { CatalogEntry } from "../types";

// Component families for the overview. Navigation uses alphabetical display names.
const entries: CatalogEntry[] = [
	{
		group: "Content",
		icon: catalogIcons.input,
		docs: aspectRatioDocs,
		content: aspectRatioContent,
	},
	{
		group: "Controls",
		icon: catalogIcons.input,
		docs: oneTimeCodeDocs,
		content: oneTimeCodeContent,
	},
	{
		group: "Controls",
		icon: catalogIcons.input,
		docs: wakeSliderDocs,
		content: wakeSliderContent,
	},
	{
		group: "Controls",
		icon: catalogIcons.input,
		docs: sloshSliderDocs,
		content: sloshSliderContent,
	},
	{
		group: "Navigation",
		icon: catalogIcons.searchList,
		docs: commandDocs,
		content: commandContent,
	},
	{
		group: "Feedback",
		icon: catalogIcons.input,
		docs: skeletonDocs,
		content: skeletonContent,
	},
	{
		group: "Navigation",
		icon: catalogIcons.input,
		docs: breadcrumbDocs,
		content: breadcrumbContent,
	},
	{
		group: "Controls",
		icon: catalogIcons.input,
		docs: radioGroupDocs,
		content: radioGroupContent,
	},
	{
		group: "Controls",
		icon: catalogIcons.input,
		docs: comboBoxDocs,
		content: comboBoxContent,
	},
	{
		group: "Content",
		icon: catalogIcons.input,
		docs: contentUnavailableViewDocs,
		content: contentUnavailableViewContent,
	},
	{
		group: "Content",
		icon: catalogIcons.input,
		docs: keyboardShortcutDocs,
		content: keyboardShortcutContent,
	},
	{
		group: "Content",
		icon: catalogIcons.input,
		docs: codeBlockDocs,
		content: codeBlockContent,
	},
	{
		group: "Layout and disclosure",
		icon: catalogIcons.unfold,
		docs: accordionDocs,
		content: accordionContent,
	},
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
		icon: catalogIcons.menu,
		docs: menuDocs,
		content: menuContent,
	},
	{
		group: "Layout and disclosure",
		icon: catalogIcons.unfold,
		docs: disclosureGroupDocs,
		content: disclosureGroupContent,
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
];

export { catalogGroups } from "./catalog-groups";

// Shared by the sidebar, overview, search and previous/next navigation.
const orderedEntries = [...entries].sort((left, right) =>
	componentTitle(left).localeCompare(componentTitle(right), "en"),
);

export function getCatalog(): readonly CatalogEntry[] {
	return orderedEntries;
}

export function getEntry(slug: string): CatalogEntry | undefined {
	return entries.find((entry) => entry.docs.slug === slug);
}

/** The components before and after this one, in sidebar order. */
export function getNeighbours(slug: string) {
	const index = orderedEntries.findIndex((entry) => entry.docs.slug === slug);
	return {
		previous: index > 0 ? orderedEntries[index - 1] : undefined,
		next: index >= 0 ? orderedEntries[index + 1] : undefined,
	};
}
