import type { PartApi } from "@/features/components/types";

/** One table per exported part, read from the built declarations. */
export function PropsTables({ parts }: { parts: PartApi[] }) {
	const documented = parts.filter((part) => part.props.length > 0);
	if (documented.length === 0)
		return (
			<p className="text-subheadline text-label-secondary">
				No props beyond the native element's.
			</p>
		);
	return (
		<div className="flex flex-col gap-6">
			{documented.map((part) => (
				<div key={part.name} className="flex flex-col gap-2">
					<h3 className="text-headline font-semibold">
						<code>{part.name}</code>
					</h3>
					{part.description ? (
						<p className="text-subheadline text-label-secondary">
							{part.description}
						</p>
					) : null}
					<div className="ring-separator overflow-x-auto rounded-xl ring-1">
						<table className="text-footnote w-full min-w-120 border-collapse text-left">
							<thead className="bg-fill/50">
								<tr>
									<th className="px-3 py-2 font-semibold">Prop</th>
									<th className="px-3 py-2 font-semibold">Type</th>
									<th className="px-3 py-2 font-semibold">Default</th>
								</tr>
							</thead>
							<tbody>
								{part.props.map((prop) => (
									<tr
										key={prop.name}
										className="border-separator border-t align-top"
									>
										<td className="px-3 py-2">
											<code className="text-accent-text">{prop.name}</code>
											{prop.required ? (
												<span className="text-danger ms-1">*</span>
											) : null}
											{prop.description ? (
												<p className="text-label-secondary mt-1">
													{prop.description}
												</p>
											) : null}
										</td>
										<td className="px-3 py-2">
											<code className="break-words">{prop.type}</code>
										</td>
										<td className="px-3 py-2">
											{prop.default ? <code>{prop.default}</code> : "–"}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			))}
		</div>
	);
}
