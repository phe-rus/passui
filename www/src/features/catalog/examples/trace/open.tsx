import { Trace, TraceItem } from "@passui/react/trace";

export function TraceOpen() {
	return (
		<Trace className="w-full max-w-sm">
			<TraceItem title="Searched the docs" meta="1.4s" defaultOpen>
				Found 3 pages about Dialog and Sheet.
			</TraceItem>
			<TraceItem title="Read the page" meta="0.6s">
				Quoted the second section.
			</TraceItem>
		</Trace>
	);
}
