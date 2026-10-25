import {
    Picker,
    SegmentedControl,
    SwatchPicker,
} from "@passui/react"
import { accents } from "@passui/react/tokens"
import { accentNames } from "../content/accent-names"
import {
    type DocsSettings,
    type PreviewPlatform,
    type PreviewTheme,
    type PreviewViewport,
    platformOptions,
} from "../types"

type SettingsBarProps = {
    settings: DocsSettings
    onChange: (next: Partial<DocsSettings>) => void
}

const themeLabels: Record<PreviewTheme, string> = {
    system: "System",
    light: "Light",
    dark: "Dark",
}

const platformLabels: Record<PreviewPlatform, string> = {
    auto: "Automatic",
    ios: "iOS",
    android: "Android",
    macos: "macOS",
    windows: "Windows",
    linux: "Linux",
}

const viewportLabels: Record<PreviewViewport, string> = {
    phone: "Phone",
    tablet: "Tablet",
    fill: "Fill",
}

function options<T extends string>(
    labels: Record<T, string>
) {
    return (Object.keys(labels) as T[]).map((value) => ({
        value,
        label: labels[value],
    }))
}

/** How the preview looks: theme, accent, platform and frame size (AC-4). */
export function SettingsBar({
    settings,
    onChange,
}: SettingsBarProps) {
    return (
        <div className="flex flex-col gap-5 p-5 md:p-6">
            <div className="grid gap-5 sm:grid-cols-3">
                <SegmentedControl
                    label="Theme"
                    value={settings.theme}
                    options={options(themeLabels)}
                    onChange={(theme) => onChange({ theme })}
                />
                <Picker
                    label="Platform"
                    value={settings.os}
                    options={platformOptions.map((value) => ({
                        value,
                        label: platformLabels[value],
                    }))}
                    onChange={(os) => onChange({ os })}
                />
                <SegmentedControl
                    label="Viewport"
                    value={settings.viewport}
                    options={options(viewportLabels)}
                    onChange={(viewport) =>
                        onChange({ viewport })
                    }
                />
            </div>
            <SwatchPicker
                label="Accent"
                value={settings.accent}
                onChange={(accent) => onChange({ accent })}
                options={Object.values(accents).map(
                    (accent) => ({
                        value: accent.id,
                        label: accentNames[accent.id],
                        color: accent.swatch,
                        ink: accent.light.accentText,
                    })
                )}
            />
        </div>
    )
}
