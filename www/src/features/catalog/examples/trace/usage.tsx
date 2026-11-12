import { Trace, TraceItem } from "@passui/react/trace";

export function TraceUsage() {
	return (
		<Trace className="w-full max-w-sm">
			<TraceItem title="Read the request" meta="0.2s" />
			<TraceItem title="Searched the docs" meta="1.4s" defaultOpen>
				Found 3 pages about Dialog and Sheet.
			</TraceItem>
			<TraceItem title="Writing the answer" status="running" />
		</Trace>
	);
}
