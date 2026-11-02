import { Picker, SwatchPicker } from "@passui/react"
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

function optionsFor<T extends string>(labels: Record<T, string>) {
    return (Object.keys(labels) as T[]).map((value) => ({ value, label: labels[value] }))
}

/** How the preview looks: theme, accent, platform and frame size (AC-4). */
export function SettingsBar({ settings, onChange }: SettingsBarProps) {
    return (
        <div className="flex flex-col gap-3 p-4">
            <div className="grid gap-3 sm:grid-cols-3">
                <div className="flex flex-col gap-1.5">
                    <span
                        aria-hidden="true"
                        className="text-caption2 font-medium text-label-tertiary"
                    >
                        Theme
                    </span>
                    <Picker
                        label="Theme"
                        value={settings.theme}
                        options={optionsFor(themeLabels)}
                        onChange={(theme) => onChange({ theme })}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <span
                        aria-hidden="true"
                        className="text-caption2 font-medium text-label-tertiary"
                    >
                        Platform
                    </span>
                    <Picker
                        label="Platform"
                        value={settings.os}
                        options={platformOptions.map((value) => ({
                            value,
                            label: platformLabels[value],
                        }))}
                        onChange={(os) => onChange({ os })}
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <span
                        aria-hidden="true"
                        className="text-caption2 font-medium text-label-tertiary"
                    >
                        Viewport
                    </span>
                    <Picker
                        label="Viewport"
                        value={settings.viewport}
                        options={optionsFor(viewportLabels)}
                        onChange={(viewport) => onChange({ viewport })}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <span aria-hidden="true" className="text-caption2 font-medium text-label-tertiary">
                    Accent
                </span>
                <SwatchPicker
                    label="Accent"
                    value={settings.accent}
                    onChange={(accent) => onChange({ accent })}
                    options={Object.values(accents).map((accent) => ({
                        value: accent.id,
                        label: accentNames[accent.id],
                        color: accent.swatch,
                        ink: accent.light.accentText,
                    }))}
                />
            </div>
        </div>
    )
}
