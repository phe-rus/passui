import {
	LanguagesIcon,
	Loading03Icon,
	Logout01Icon,
	MoreVertical,
	SentIcon,
	InboxIcon as InboxGlyph,
	LaptopIcon as LaptopGlyph,
	SmartPhone01Icon,
	Tablet01Icon,
	Home01Icon,
	LibraryIcon as LibraryGlyph,
	UserIcon,
	Analytics01Icon,
	CustomerSupportIcon,
	Key01Icon,
	LockPasswordIcon,
	Add01Icon,
	AiMagicIcon,
	AlarmClockIcon,
	Alert02Icon,
	Archive01Icon,
	ArrowDown01Icon,
	ArrowLeft01Icon,
	ArrowRight01Icon,
	ArrowUp01Icon,
	BirthdayCakeIcon,
	Bookmark02Icon,
	Book02Icon,
	BookOpen01Icon,
	BubbleChatIcon,
	Calendar03Icon,
	Camera01Icon,
	Cancel01Icon,
	CheckListIcon,
	CheckmarkBadge01Icon,
	CheckmarkCircle02Icon,
	Clock01Icon,
	Comment01Icon,
	Copy01Icon,
	Cursor01Icon,
	Delete02Icon,
	Download01Icon,
	DragDropVerticalIcon,
	Eraser01Icon,
	FavouriteIcon,
	Folder01Icon,
	FileImportIcon,
	FullScreenIcon,
	Globe02Icon,
	GoBackward15SecIcon,
	GoForward30SecIcon,
	CanvasIcon as HugeCanvasIcon,
	HeadphonesIcon as HugeHeadphonesIcon,
	HighlighterIcon as HugeHighlighterIcon,
	PauseIcon as HugePauseIcon,
	PlayIcon as HugePlayIcon,
	RedoIcon as HugeRedoIcon,
	RepeatIcon as HugeRepeatIcon,
	StarIcon as HugeStarIcon,
	ThumbsUpIcon as HugeThumbsUpIcon,
	UndoIcon as HugeUndoIcon,
	Image01Icon,
	InformationCircleIcon,
	Invoice03Icon,
	LayoutGridIcon,
	LeftToRightListBulletIcon,
	Link01Icon,
	Location01Icon,
	LockIcon as LockIconSvg,
	Mic01Icon,
	Menu01Icon,
	Mail01Icon,
	MailReply01Icon,
	Moon02Icon,
	MoreHorizontalIcon,
	Mortarboard01Icon,
	NextIcon,
	NfcIcon,
	Note01Icon,
	NotebookIcon,
	Notification03Icon,
	PaintBrush02Icon,
	PanelLeftIcon,
	PencilEdit02Icon,
	PencilIcon,
	Pin02Icon,
	PreviousIcon,
	PrinterIcon,
	QrCodeIcon,
	QuillWrite02Icon,
	ScanIcon,
	Search01Icon,
	SearchAddIcon,
	Settings02Icon,
	Share08Icon,
	Store01Icon,
	Task01Icon,
	TextAlignCenterIcon,
	TextAlignLeftIcon,
	TextBoldIcon,
	TextItalicIcon,
	TextUnderlineIcon,
	Tick02Icon,
	Time04Icon,
	Touch01Icon,
	UnfoldMoreIcon,
	UserAdd01Icon,
	UserMultipleIcon,
	ViewIcon,
	ViewOffSlashIcon,
	Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
	Analytics01Icon as CatalogAnalyticsGlyph,
	Calendar03Icon as CatalogCalendarGlyph,
	Clock01Icon as CatalogClockGlyph,
	ColorsIcon as CatalogColorsGlyph,
	InputTextIcon as CatalogInputTextGlyph,
	LabelIcon as CatalogLabelGlyph,
	LayoutTwoColumnIcon as CatalogColumnsGlyph,
	ListViewIcon as CatalogListGlyph,
	LockPasswordIcon as CatalogPasswordGlyph,
	Search01Icon as CatalogSearchGlyph,
	SearchList01Icon as CatalogSearchListGlyph,
	Settings02Icon as CatalogSettingsGlyph,
	StatusIcon as CatalogStatusGlyph,
	Tag01Icon as CatalogTagGlyph,
	Tap01Icon as CatalogTapGlyph,
	TextAlignLeftIcon as CatalogTextGlyph,
	ToggleOnIcon as CatalogToggleGlyph,
	UnfoldMoreIcon as CatalogUnfoldGlyph,
	UserCircleIcon as CatalogUserGlyph,
	LayoutTopIcon as CatalogLayoutTopGlyph,
	LayoutBottomIcon as CatalogLayoutBottomGlyph,
	SidebarLeftIcon as CatalogSidebarGlyph,
	BrowserIcon as CatalogBrowserGlyph,
	Table01Icon as CatalogTableGlyph,
	CardsIcon as CatalogCardsGlyph,
	Message01Icon as CatalogMessageGlyph,
	Sun03Icon as CatalogSunGlyph,
	AlertSquareIcon as CatalogAlertGlyph,
	PanelBottomIcon as CatalogPanelGlyph,
	BubbleChatIcon as CatalogBubbleGlyph,
	Notification03Icon as CatalogNotificationGlyph,
	MenuSquareIcon as CatalogMenuGlyph,
	HelpCircleIcon as CatalogHelpGlyph,
	TranslateIcon as CatalogTranslateGlyph,
	PaintBoardIcon as GuidePaintGlyph,
	TextIcon as GuideTextGlyph,
	Layers01Icon as GuideLayersGlyph,
	ArrowUp02Icon as UploadGlyph,
	PlusSignIcon as AttachGlyph,
} from "@hugeicons/core-free-icons";
import type { SVGProps } from "react";
import { cn } from "../lib/class-names";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
	/** Width and height in CSS pixels. @default 20 */
	size?: number;
	/** Stroke weight shared across Passui icons. @default 1.6 */
	strokeWidth?: number;
};

/** Rounded stroke icons with Passui's default size, weight, and decorative semantics. */
function icon(svg: IconSvgElement, displayName: string) {
	const Icon = ({ size = 20, strokeWidth = 1.6, ...props }: IconProps) => (
		<HugeiconsIcon
			icon={svg}
			size={size}
			strokeWidth={strokeWidth}
			aria-hidden="true"
			{...props}
		/>
	);
	Icon.displayName = displayName;
	return Icon;
}

/** A filled variant for toggled states (hearted, starred). */
function toggleIcon(svg: IconSvgElement, displayName: string) {
	const Base = /* @__PURE__ */ icon(svg, displayName);
	const Icon = ({
		filled = false,
		className,
		...props
	}: IconProps & { filled?: boolean }) => (
		<Base
			className={cn(filled && "[&_path]:fill-current", className)}
			{...props}
		/>
	);
	Icon.displayName = displayName;
	return Icon;
}

/** Existing catalog glyphs rendered through PassUI's common icon contract. */
export const catalogIcons = {
	tap: /* @__PURE__ */ icon(CatalogTapGlyph, "CatalogTapIcon"),
	settings: /* @__PURE__ */ icon(CatalogSettingsGlyph, "CatalogSettingsIcon"),
	tag: /* @__PURE__ */ icon(CatalogTagGlyph, "CatalogTagIcon"),
	input: /* @__PURE__ */ icon(CatalogInputTextGlyph, "CatalogInputIcon"),
	password: /* @__PURE__ */ icon(CatalogPasswordGlyph, "CatalogPasswordIcon"),
	search: /* @__PURE__ */ icon(CatalogSearchGlyph, "CatalogSearchIcon"),
	toggle: /* @__PURE__ */ icon(CatalogToggleGlyph, "CatalogToggleIcon"),
	columns: /* @__PURE__ */ icon(CatalogColumnsGlyph, "CatalogColumnsIcon"),
	unfold: /* @__PURE__ */ icon(CatalogUnfoldGlyph, "CatalogUnfoldIcon"),
	colors: /* @__PURE__ */ icon(CatalogColorsGlyph, "CatalogColorsIcon"),
	calendar: /* @__PURE__ */ icon(CatalogCalendarGlyph, "CatalogCalendarIcon"),
	clock: /* @__PURE__ */ icon(CatalogClockGlyph, "CatalogClockIcon"),
	text: /* @__PURE__ */ icon(CatalogTextGlyph, "CatalogTextIcon"),
	searchList: /* @__PURE__ */ icon(
		CatalogSearchListGlyph,
		"CatalogSearchListIcon",
	),
	list: /* @__PURE__ */ icon(CatalogListGlyph, "CatalogListIcon"),
	label: /* @__PURE__ */ icon(CatalogLabelGlyph, "CatalogLabelIcon"),
	table: /* @__PURE__ */ icon(CatalogTableGlyph, "CatalogTableIcon"),
	cards: /* @__PURE__ */ icon(CatalogCardsGlyph, "CatalogCardsIcon"),
	message: /* @__PURE__ */ icon(CatalogMessageGlyph, "CatalogMessageIcon"),
	sun: /* @__PURE__ */ icon(CatalogSunGlyph, "CatalogSunIcon"),
	status: /* @__PURE__ */ icon(CatalogStatusGlyph, "CatalogStatusIcon"),
	analytics: /* @__PURE__ */ icon(
		CatalogAnalyticsGlyph,
		"CatalogAnalyticsIcon",
	),
	alert: /* @__PURE__ */ icon(CatalogAlertGlyph, "CatalogAlertIcon"),
	panel: /* @__PURE__ */ icon(CatalogPanelGlyph, "CatalogPanelIcon"),
	bubble: /* @__PURE__ */ icon(CatalogBubbleGlyph, "CatalogBubbleIcon"),
	notification: /* @__PURE__ */ icon(
		CatalogNotificationGlyph,
		"CatalogNotificationIcon",
	),
	menu: /* @__PURE__ */ icon(CatalogMenuGlyph, "CatalogMenuIcon"),
	help: /* @__PURE__ */ icon(CatalogHelpGlyph, "CatalogHelpIcon"),
	translate: /* @__PURE__ */ icon(
		CatalogTranslateGlyph,
		"CatalogTranslateIcon",
	),
	layoutTop: /* @__PURE__ */ icon(
		CatalogLayoutTopGlyph,
		"CatalogLayoutTopIcon",
	),
	layoutBottom: /* @__PURE__ */ icon(
		CatalogLayoutBottomGlyph,
		"CatalogLayoutBottomIcon",
	),
	sidebar: /* @__PURE__ */ icon(CatalogSidebarGlyph, "CatalogSidebarIcon"),
	browser: /* @__PURE__ */ icon(CatalogBrowserGlyph, "CatalogBrowserIcon"),
	user: /* @__PURE__ */ icon(CatalogUserGlyph, "CatalogUserIcon"),
} as const;

export const NoteIcon = /* @__PURE__ */ icon(Note01Icon, "NoteIcon");
export const LanguageIcon = /* @__PURE__ */ icon(LanguagesIcon, "LanguageIcon");
export const LoadingIcon = /* @__PURE__ */ icon(Loading03Icon, "LoadingIcon");
export const SignOutIcon = /* @__PURE__ */ icon(Logout01Icon, "SignOutIcon");
export const MoreVerticalIcon = /* @__PURE__ */ icon(
	MoreVertical,
	"MoreVerticalIcon",
);
export const SendIcon = /* @__PURE__ */ icon(SentIcon, "SendIcon");
export const InboxIcon = /* @__PURE__ */ icon(InboxGlyph, "InboxIcon");
export const LaptopIcon = /* @__PURE__ */ icon(LaptopGlyph, "LaptopIcon");
export const SmartphoneIcon = /* @__PURE__ */ icon(
	SmartPhone01Icon,
	"SmartphoneIcon",
);
export const TabletIcon = /* @__PURE__ */ icon(Tablet01Icon, "TabletIcon");
export const HomeIcon = /* @__PURE__ */ icon(Home01Icon, "HomeIcon");
export const LibraryIcon = /* @__PURE__ */ icon(LibraryGlyph, "LibraryIcon");
export const PersonIcon = /* @__PURE__ */ icon(UserIcon, "PersonIcon");
export const ChartIcon = /* @__PURE__ */ icon(Analytics01Icon, "ChartIcon");
export const SupportIcon = /* @__PURE__ */ icon(
	CustomerSupportIcon,
	"SupportIcon",
);
export const KeyIcon = /* @__PURE__ */ icon(Key01Icon, "KeyIcon");
export const PasswordIcon = /* @__PURE__ */ icon(
	LockPasswordIcon,
	"PasswordIcon",
);
export const JournalIcon = /* @__PURE__ */ icon(NotebookIcon, "JournalIcon");
export const PenIcon = /* @__PURE__ */ icon(PencilEdit02Icon, "PenIcon");
export const StoryIcon = /* @__PURE__ */ icon(QuillWrite02Icon, "StoryIcon");
export const BookIcon = /* @__PURE__ */ icon(BookOpen01Icon, "BookIcon");
export const ArticleIcon = /* @__PURE__ */ icon(Book02Icon, "ArticleIcon");
export const CanvasIcon = /* @__PURE__ */ icon(HugeCanvasIcon, "CanvasIcon");
export const LessonIcon = /* @__PURE__ */ icon(Mortarboard01Icon, "LessonIcon");
export const PlanIcon = /* @__PURE__ */ icon(CheckListIcon, "PlanIcon");
export const MicIcon = /* @__PURE__ */ icon(Mic01Icon, "MicIcon");
export const GlobeIcon = /* @__PURE__ */ icon(Globe02Icon, "GlobeIcon");
export const ChecklistIcon = /* @__PURE__ */ icon(
	CheckmarkCircle02Icon,
	"ChecklistIcon",
);
export const DrawIcon = /* @__PURE__ */ icon(PencilIcon, "DrawIcon");
export const ShareIcon = /* @__PURE__ */ icon(Share08Icon, "ShareIcon");
export const SearchIcon = /* @__PURE__ */ icon(Search01Icon, "SearchIcon");
export const ChevronLeftIcon = /* @__PURE__ */ icon(
	ArrowLeft01Icon,
	"ChevronLeftIcon",
);
export const ChevronRightIcon = /* @__PURE__ */ icon(
	ArrowRight01Icon,
	"ChevronRightIcon",
);
export const ChevronUpIcon = /* @__PURE__ */ icon(
	ArrowUp01Icon,
	"ChevronUpIcon",
);
export const ChevronDownIcon = /* @__PURE__ */ icon(
	ArrowDown01Icon,
	"ChevronDownIcon",
);
export const CloseIcon = /* @__PURE__ */ icon(Cancel01Icon, "CloseIcon");
export const MenuIcon = /* @__PURE__ */ icon(Menu01Icon, "MenuIcon");
export const ThemingIcon = /* @__PURE__ */ icon(GuidePaintGlyph, "ThemingIcon");
export const TypesetIcon = /* @__PURE__ */ icon(GuideTextGlyph, "TypesetIcon");
export const LayersIcon = /* @__PURE__ */ icon(GuideLayersGlyph, "LayersIcon");
export const UploadIcon = /* @__PURE__ */ icon(UploadGlyph, "UploadIcon");
export const AttachIcon = /* @__PURE__ */ icon(AttachGlyph, "AttachIcon");
export const PlusIcon = /* @__PURE__ */ icon(Add01Icon, "PlusIcon");
export const LinkIcon = /* @__PURE__ */ icon(Link01Icon, "LinkIcon");
export const CommentIcon = /* @__PURE__ */ icon(Comment01Icon, "CommentIcon");
export const TrashIcon = /* @__PURE__ */ icon(Delete02Icon, "TrashIcon");
export const PinIcon = /* @__PURE__ */ icon(Pin02Icon, "PinIcon");
export const SidebarIcon = /* @__PURE__ */ icon(PanelLeftIcon, "SidebarIcon");
export const SettingsIcon = /* @__PURE__ */ icon(
	Settings02Icon,
	"SettingsIcon",
);
export const DragHandleIcon = /* @__PURE__ */ icon(
	DragDropVerticalIcon,
	"DragHandleIcon",
);
export const VisibleIcon = /* @__PURE__ */ icon(ViewIcon, "VisibleIcon");
export const HiddenIcon = /* @__PURE__ */ icon(ViewOffSlashIcon, "HiddenIcon");
export const CheckIcon = /* @__PURE__ */ icon(Tick02Icon, "CheckIcon");
export const InvoiceIcon = /* @__PURE__ */ icon(Invoice03Icon, "InvoiceIcon");
export const QrCodeGlyph = /* @__PURE__ */ icon(QrCodeIcon, "QrCodeGlyph");
export const WalletIcon = /* @__PURE__ */ icon(Wallet01Icon, "WalletIcon");
export const ScanCodeIcon = /* @__PURE__ */ icon(ScanIcon, "ScanCodeIcon");
export const VerifiedIcon = /* @__PURE__ */ icon(
	CheckmarkBadge01Icon,
	"VerifiedIcon",
);
export const WarningIcon = /* @__PURE__ */ icon(Alert02Icon, "WarningIcon");
export const PrintIcon = /* @__PURE__ */ icon(PrinterIcon, "PrintIcon");
export const ImportIcon = /* @__PURE__ */ icon(FileImportIcon, "ImportIcon");
export const DownloadIcon = /* @__PURE__ */ icon(
	Download01Icon,
	"DownloadIcon",
);
export const PlayIcon = /* @__PURE__ */ icon(HugePlayIcon, "PlayIcon");
export const PauseIcon = /* @__PURE__ */ icon(HugePauseIcon, "PauseIcon");
export const SkipBackIcon = /* @__PURE__ */ icon(
	GoBackward15SecIcon,
	"SkipBackIcon",
);
export const SkipForwardIcon = /* @__PURE__ */ icon(
	GoForward30SecIcon,
	"SkipForwardIcon",
);
export const PreviousTrackIcon = /* @__PURE__ */ icon(
	PreviousIcon,
	"PreviousTrackIcon",
);
export const NextTrackIcon = /* @__PURE__ */ icon(NextIcon, "NextTrackIcon");
export const HeadphonesIcon = /* @__PURE__ */ icon(
	HugeHeadphonesIcon,
	"HeadphonesIcon",
);
export const HighlighterIcon = /* @__PURE__ */ icon(
	HugeHighlighterIcon,
	"HighlighterIcon",
);
export const ChaptersIcon = /* @__PURE__ */ icon(
	LeftToRightListBulletIcon,
	"ChaptersIcon",
);
export const SleepIcon = /* @__PURE__ */ icon(Moon02Icon, "SleepIcon");
export const ExpandIcon = /* @__PURE__ */ icon(FullScreenIcon, "ExpandIcon");
export const SparkleIcon = /* @__PURE__ */ icon(AiMagicIcon, "SparkleIcon");
export const BellIcon = /* @__PURE__ */ icon(Notification03Icon, "BellIcon");
export const BusinessIcon = /* @__PURE__ */ icon(Store01Icon, "BusinessIcon");
export const CalendarIcon = /* @__PURE__ */ icon(
	Calendar03Icon,
	"CalendarIcon",
);
export const BirthdayIcon = /* @__PURE__ */ icon(
	BirthdayCakeIcon,
	"BirthdayIcon",
);
export const AlarmIcon = /* @__PURE__ */ icon(AlarmClockIcon, "AlarmIcon");
export const RepeatIcon = /* @__PURE__ */ icon(HugeRepeatIcon, "RepeatIcon");
export const UndoIcon = /* @__PURE__ */ icon(HugeUndoIcon, "UndoIcon");
export const RedoIcon = /* @__PURE__ */ icon(HugeRedoIcon, "RedoIcon");
export const PointerIcon = /* @__PURE__ */ icon(Cursor01Icon, "PointerIcon");
export const EraserIcon = /* @__PURE__ */ icon(Eraser01Icon, "EraserIcon");
export const TouchIcon = /* @__PURE__ */ icon(Touch01Icon, "TouchIcon");
export const BubbleIcon = /* @__PURE__ */ icon(BubbleChatIcon, "BubbleIcon");
export const BrushIcon = /* @__PURE__ */ icon(PaintBrush02Icon, "BrushIcon");
export const LayoutIcon = /* @__PURE__ */ icon(LayoutGridIcon, "LayoutIcon");
export const ZoomIcon = /* @__PURE__ */ icon(SearchAddIcon, "ZoomIcon");
export const SelectorIcon = /* @__PURE__ */ icon(
	UnfoldMoreIcon,
	"SelectorIcon",
);
export const MoreIcon = /* @__PURE__ */ icon(MoreHorizontalIcon, "MoreIcon");
export const PeopleIcon = /* @__PURE__ */ icon(UserMultipleIcon, "PeopleIcon");
export const AddPersonIcon = /* @__PURE__ */ icon(
	UserAdd01Icon,
	"AddPersonIcon",
);
export const ClockIcon = /* @__PURE__ */ icon(Clock01Icon, "ClockIcon");
export const LocationIcon = /* @__PURE__ */ icon(
	Location01Icon,
	"LocationIcon",
);
export const TaskIcon = /* @__PURE__ */ icon(Task01Icon, "TaskIcon");
export const FolderIcon = /* @__PURE__ */ icon(Folder01Icon, "FolderIcon");
export const RecentIcon = /* @__PURE__ */ icon(Time04Icon, "RecentIcon");
export const ThumbsUpIcon = /* @__PURE__ */ toggleIcon(
	HugeThumbsUpIcon,
	"ThumbsUpIcon",
);
export const HeartIcon = /* @__PURE__ */ toggleIcon(FavouriteIcon, "HeartIcon");
export const StarIcon = /* @__PURE__ */ toggleIcon(HugeStarIcon, "StarIcon");

// Wallet: adding, copying and protecting cards.
export const CameraIcon = /* @__PURE__ */ icon(Camera01Icon, "CameraIcon");
export const CopyIcon = /* @__PURE__ */ icon(Copy01Icon, "CopyIcon");
export const LockIcon = /* @__PURE__ */ icon(LockIconSvg, "LockIcon");
export const NfcReadIcon = /* @__PURE__ */ icon(NfcIcon, "NfcReadIcon");
export const PhotoIcon = /* @__PURE__ */ icon(Image01Icon, "PhotoIcon");
export const BookmarkIcon = /* @__PURE__ */ icon(
	Bookmark02Icon,
	"BookmarkIcon",
);
export const MailIcon = /* @__PURE__ */ icon(Mail01Icon, "MailIcon");
export const ReplyIcon = /* @__PURE__ */ icon(MailReply01Icon, "ReplyIcon");
export const ArchiveIcon = /* @__PURE__ */ icon(Archive01Icon, "ArchiveIcon");
export const InfoIcon = /* @__PURE__ */ icon(InformationCircleIcon, "InfoIcon");
export const AlignCenterIcon = /* @__PURE__ */ icon(
	TextAlignCenterIcon,
	"AlignCenterIcon",
);
export const AlignLeftIcon = /* @__PURE__ */ icon(
	TextAlignLeftIcon,
	"AlignLeftIcon",
);
export const BoldIcon = /* @__PURE__ */ icon(TextBoldIcon, "BoldIcon");
export const ItalicIcon = /* @__PURE__ */ icon(TextItalicIcon, "ItalicIcon");
export const UnderlineIcon = /* @__PURE__ */ icon(
	TextUnderlineIcon,
	"UnderlineIcon",
);
