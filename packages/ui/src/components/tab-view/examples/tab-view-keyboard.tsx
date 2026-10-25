import { TabView } from "@passui/react/tab-view"

const days = [
    { value: "mon", label: "Mon" },
    { value: "tue", label: "Tue" },
    { value: "wed", label: "Wed" },
    { value: "thu", label: "Thu" },
    { value: "fri", label: "Fri" },
] as const

const plans = {
    mon: "Design review at 10:00",
    tue: "Focus time, no meetings",
    wed: "Team lunch at 12:30",
    thu: "Ship the release",
    fri: "Retro and planning",
}

export function TabViewKeyboard() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-3">
            <p className="text-center text-footnote text-label-secondary">
                Tab into the row, then use the arrow keys,
                Home and End.
            </p>
            <TabView
                label="Weekday"
                defaultValue="wed"
                options={days}
            >
                {(day) => (
                    <p className="rounded-3xl bg-fill/60 p-4 text-center text-callout text-label">
                        {plans[day]}
                    </p>
                )}
            </TabView>
        </div>
    )
}
