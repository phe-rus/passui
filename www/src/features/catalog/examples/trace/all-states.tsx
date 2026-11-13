import { Trace, TraceItem } from "@passui/react/trace";

export function TraceAllStates() {
	return (
		<Trace className="w-full max-w-sm">
			<TraceItem title="Plan the steps" meta="0.1s" />
			<TraceItem title="Fetch the data" status="running" />
			<TraceItem title="Write the summary" />
		</Trace>
	);
}
