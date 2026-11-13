import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@passui/react/table";
import type { PartApi } from "@/features/catalog/types";
import { DocSection } from "./doc-section";

interface ApiSectionProps {
	/** Every part, the root first. Parts without props are left out. */
	parts: PartApi[];
}

/**
 * Props for every part, read from the component's types. One frame per part
 * owns the rounded corners, the hairline and the clipping, so the header fill
 * follows the curve and a wide type scrolls inside the frame instead of
 * pushing past it. Names never truncate: a description sits under its name and
 * a long type wraps.
 */
export function ApiSection({ parts }: ApiSectionProps) {
	return (
		<DocSection
			id="api-reference"
			title="API reference"
			description="Props for every part, read from the component's types."
		>
			<div className="flex flex-col gap-8">
				{parts
					.filter((part) => part.props.length > 0)
					.map((part) => (
						<div key={part.name} className="flex flex-col gap-3">
							<header className="flex flex-col gap-0">
								<h3 className="text-subheadline text-label m-0 font-medium">
									<code>{part.name}</code>
								</h3>
								{part.description ? (
									<p className="text-footnote text-label-secondary m-0">
										{part.description}
									</p>
								) : null}
							</header>
							<div className="ring-separator/60 overflow-hidden rounded-3xl ring-1">
								<Table className="text-caption w-full table-fixed text-left">
									<TableHeader className="bg-fill/50">
										<TableRow>
											<TableHead className="text-caption w-[38%] px-4 py-2.5">
												Prop
											</TableHead>
											<TableHead className="text-caption w-[38%] px-4 py-2.5">
												Type
											</TableHead>
											<TableHead className="text-caption w-[24%] px-4 py-2.5">
												Default
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{part.props.map((prop) => (
											<TableRow
												key={prop.name}
												className="border-separator/60 hover:bg-fill/30 border-t align-top transition-colors duration-(--duration-fast) motion-reduce:transition-none"
											>
												<TableCell className="px-4 py-3 align-top whitespace-normal!">
													<code className="text-caption text-label font-medium break-words">
														{prop.name}
													</code>
													{prop.required ? (
														<span
															className="text-danger ms-1"
															role="img"
															aria-label="required"
														>
															*
														</span>
													) : null}
													{prop.description ? (
														<p className="text-caption text-label-secondary m-0 mt-1 font-sans">
															{prop.description}
														</p>
													) : null}
												</TableCell>
												<TableCell className="px-4 py-3 align-top whitespace-normal!">
													<code className="text-caption text-label break-words">
														{prop.type}
													</code>
												</TableCell>
												<TableCell className="px-4 py-3 align-top whitespace-normal!">
													{prop.default ? (
														<code className="text-caption text-label break-words">
															{prop.default}
														</code>
													) : (
														<span
															className="text-label-tertiary"
															role="img"
															aria-label="no default"
														>
															–
														</span>
													)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
					))}
			</div>
		</DocSection>
	);
}
