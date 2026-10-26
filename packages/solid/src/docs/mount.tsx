import { createSignal, type JSX } from "solid-js"
import { Dynamic, render } from "solid-js/web"
import { Button } from "../components/button/button"
import { IconButton } from "../components/button/icon-button"
import { ButtonUsage } from "../components/button/examples/button-usage"
import { ButtonPending } from "../components/button/examples/button-pending"
import { ButtonVariants } from "../components/button/examples/button-variants"
import { ButtonSizes } from "../components/button/examples/button-sizes"
import { ButtonDisabled } from "../components/button/examples/button-disabled"
import { IconButtonUsage } from "../components/button/examples/icon-button-usage"

import { ChipUsage } from "../components/chip/examples/chip-usage"
import { StatusIndicatorUsage } from "../components/status-indicator/examples/status-indicator-usage"
import { SectionUsage } from "../components/section/examples/section-usage"
import { LabeledContentUsage } from "../components/labeled-content/examples/labeled-content-usage"
import { StatTileUsage } from "../components/stat-tile/examples/stat-tile-usage"
import { TextFieldUsage } from "../components/text-field/examples/text-field-usage"
import { SecureFieldUsage } from "../components/secure-field/examples/secure-field-usage"
import { SearchFieldUsage } from "../components/search-field/examples/search-field-usage"
import { TextEditorUsage } from "../components/text-editor/examples/text-editor-usage"
import { ToggleUsage } from "../components/toggle/examples/toggle-usage"
import { ToggleSettings } from "../components/toggle/examples/toggle-settings"
import { ToggleCheckboxes } from "../components/toggle/examples/toggle-checkboxes"
import { ProfileImageUsage } from "../components/profile-image/examples/profile-image-usage"
import { SwatchPickerUsage } from "../components/swatch-picker/examples/swatch-picker-usage"
import { TabViewUsage } from "../components/tab-view/examples/tab-view-usage"
import { PickerUsage } from "../components/picker/examples/picker-usage"
import { SegmentedControlUsage } from "../components/segmented-control/examples/segmented-control-usage"

import { DatePickerUsage } from "../components/date-picker/examples/date-picker-usage"

import { CompactDatePickerUsage } from "../components/compact-date-picker/examples/compact-date-picker-usage"

import { CompactTimePickerUsage } from "../components/compact-time-picker/examples/compact-time-picker-usage"

import { SearchListUsage } from "../components/search-list/examples/search-list-usage"

import { SidebarUsage } from "../components/sidebar/examples/sidebar-usage"

import { ViewControllerUsage } from "../components/view-controller/examples/view-controller-usage"

import { ContentViewUsage } from "../components/content-view/examples/content-view-usage"

import { TableUsage } from "../components/table/examples/table-usage"

import { ConversationUsage } from "../components/conversation/examples/conversation-usage"

import { AmbientUsage } from "../components/ambient/examples/ambient-usage"
import { AmbientImages } from "../components/ambient/examples/ambient-images"
import { AmbientNowPlaying } from "../components/ambient/examples/ambient-now-playing"

import { TabBarUsage } from "../components/tab-bar/examples/tab-bar-usage"

import { PopoverUsage } from "../components/popover/examples/popover-usage"

import { SheetUsage } from "../components/sheet/examples/sheet-usage"

import { DialogUsage } from "../components/dialog/examples/dialog-usage"

import { LocaleSwitcherUsage } from "../components/locale-switcher/examples/locale-switcher-usage"

import { ToastUsage } from "../components/toast/examples/toast-usage"

import { TooltipUsage } from "../components/tooltip/examples/tooltip-usage"

import { ContextMenuUsage } from "../components/context-menu/examples/context-menu-usage"

const examples: Record<
    string,
    (props: Record<string, unknown>) => JSX.Element
> = {
    "date-picker-usage": DatePickerUsage,
    "compact-date-picker-usage": CompactDatePickerUsage,
    "compact-time-picker-usage": CompactTimePickerUsage,
    "search-list-usage": SearchListUsage,
    "sidebar-usage": SidebarUsage,
    "view-controller-usage": ViewControllerUsage,
    "content-view-usage": ContentViewUsage,
    "table-usage": TableUsage,
    "conversation-usage": ConversationUsage,
    "ambient-usage": AmbientUsage,
    "ambient-images": AmbientImages,
    "ambient-now-playing": AmbientNowPlaying,
    "tab-bar-usage": TabBarUsage,
    "popover-usage": PopoverUsage,
    "sheet-usage": SheetUsage,
    "dialog-usage": DialogUsage,
    "locale-switcher-usage": LocaleSwitcherUsage,
    "toast-usage": ToastUsage,
    "tooltip-usage": TooltipUsage,
    "context-menu-usage": ContextMenuUsage,
    "chip-usage": ChipUsage,
    "status-indicator-usage": StatusIndicatorUsage,
    "section-usage": SectionUsage,
    "labeled-content-usage": LabeledContentUsage,
    "stat-tile-usage": StatTileUsage,
    "text-field-usage": TextFieldUsage,
    "secure-field-usage": SecureFieldUsage,
    "search-field-usage": SearchFieldUsage,
    "text-editor-usage": TextEditorUsage,
    "toggle-usage": ToggleUsage,
    "toggle-settings": ToggleSettings,
    "toggle-checkboxes": ToggleCheckboxes,
    "profile-image-usage": ProfileImageUsage,
    "swatch-picker-usage": SwatchPickerUsage,
    "tab-view-usage": TabViewUsage,
    "picker-usage": PickerUsage,
    "segmented-control-usage": SegmentedControlUsage,
    button: (props) => <Button {...props} />,
    "button-usage": ButtonUsage,
    "button-pending": ButtonPending,
    "button-variants": ButtonVariants,
    "button-sizes": ButtonSizes,
    "button-disabled": ButtonDisabled,
    "icon-button": (props) => (
        <IconButton
            label={String(props.label ?? "Close")}
            {...props}
        >
            <span aria-hidden="true">×</span>
        </IconButton>
    ),
    "icon-button-usage": IconButtonUsage,
}

export function mountSolidPreview(
    root: HTMLElement,
    slug: string,
    initial: Record<string, unknown> = {}
) {
    const example = examples[slug]
    if (!example)
        throw new Error(`No native Solid preview for ${slug}`)
    let update = (_next: Record<string, unknown>) => {}
    const dispose = render(() => {
        const [props, setProps] = createSignal(initial)
        update = (next) => setProps(() => next)
        return <Dynamic component={example} {...props()} />
    }, root)
    return { update, dispose }
}
