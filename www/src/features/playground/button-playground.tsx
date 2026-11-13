import { Button } from "@passui/react/button";
import { CodeBlock } from "@passui/react/code-block";
import { LabeledContent } from "@passui/react/labeled-content";
import { Layout } from "@passui/react/layout";
import { SegmentedControl } from "@passui/react/segmented-control";
import { Select } from "@passui/react/select";
import { Switch } from "@passui/react/switch";
import { getRouteApi, Link } from "@tanstack/react-router";
import { buttonCode, sizes, variants } from "./button-options";
import type { PlaygroundSearch } from "./search";

const route = getRouteApi("/(marketing)/playground");

const variantItems = variants.map((value) => ({ value, label: value }));

export function ButtonPlayground() {
	const { variant, size, pending, disabled } = route.useSearch();
	const navigate = route.useNavigate();
	const update = (next: Partial<PlaygroundSearch>) =>
		void navigate({ search: (prev) => ({ ...prev, ...next }), replace: true });
	const code = buttonCode({
		variant,
		size,
		pending,
		disabled,
		label: "Continue",
	});

	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-12">
			<Layout
				heading={
					<Layout.Heading
						title="Button playground"
						description="Change the options and copy the code that matches what you see."
					/>
				}
			>
				<div className="mt-8 grid items-start gap-6 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
					<div className="flex flex-col gap-4">
						<LabeledContent label="Variant">
							<Select
								aria-label="Variant"
								items={variantItems}
								value={variant}
								onValueChange={(next) =>
									next &&
									update({ variant: next as PlaygroundSearch["variant"] })
								}
							/>
						</LabeledContent>
						<LabeledContent label="Size" stacked>
							<SegmentedControl
								aria-label="Size"
								className="me-auto"
								value={size}
								onValueChange={(next) =>
									update({ size: next as PlaygroundSearch["size"] })
								}
								options={sizes.map((value) => ({ value, label: value }))}
							/>
						</LabeledContent>
						<LabeledContent label="Pending">
							<Switch
								aria-label="Pending"
								checked={pending}
								onCheckedChange={(next) => update({ pending: next })}
							/>
						</LabeledContent>
						<LabeledContent label="Disabled">
							<Switch
								aria-label="Disabled"
								checked={disabled}
								onCheckedChange={(next) => update({ disabled: next })}
							/>
						</LabeledContent>
					</div>
					<div className="ring-separator/60 bg-accent-soft/50 flex min-h-64 items-center justify-center rounded-3xl p-10 ring-1 transition-colors duration-500">
						<Button
							variant={variant}
							size={size}
							isPending={pending}
							disabled={disabled}
						>
							Continue
						</Button>
					</div>
				</div>
				<div className="not-typeset ring-separator/60 mt-6 overflow-hidden rounded-2xl ring-1">
					<CodeBlock
						code={code}
						language="tsx"
						lineNumbers={false}
						wrap
						copyable
					/>
				</div>
				<p className="text-footnote text-label-tertiary mt-6">
					<Link to="/docs/components/$slug" params={{ slug: "button" }}>
						Every option is on the Button page
					</Link>
				</p>
			</Layout>
		</div>
	);
}
