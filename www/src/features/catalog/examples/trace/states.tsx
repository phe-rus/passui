import { Trace, TraceItem } from "@passui/react/trace";

export function TraceStates() {
	return (
		<Trace className="w-full max-w-sm">
			<TraceItem title="Pending step" status="pending" />
			<TraceItem title="Running step" status="running" />
			<TraceItem title="Finished step" status="done" />
			<TraceItem title="Failed step" status="error">
				The request timed out after 30 seconds.
			</TraceItem>
		</Trace>
	);
}
