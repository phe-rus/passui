---

title: "@passui/tanstack"
summary: Optional form, table, router and query integrations built on Passui's components.
section: libraries
order: 12
---

Passui works without TanStack. Add this package when you want forms, tables, routing helpers and mutations already wired to Passui controls.

```bash
bunx @passui/cli@latest init --integration tanstack
```

Or by hand, with the peers you use:

```bash
bun add @passui/tanstack @tanstack/react-query
```

`@passui/react` and `@passui/icons` are peers of this package.

## Styles

```css
@import "@passui/tanstack/globals.css";
```

This imports Tailwind, the Passui theme and the styles for the integrations in one line.

## Entry points

| Import                            | What it gives you                                       |
| --------------------------------- | ------------------------------------------------------- |
| `@passui/tanstack/forms`          | Form setup on TanStack Form                             |
| `@passui/tanstack/form-fields`    | Passui inputs bound to form state, such as `FieldInput` |
| `@passui/tanstack/tables`         | Tables on TanStack Table                                |
| `@passui/tanstack/mutation`       | Mutations with optimistic updates                       |
| `@passui/tanstack/route-boundary` | Error and not found boundaries for routes               |
| `@passui/tanstack/auth-shell`     | A sign in shell                                         |
| `@passui/tanstack/settings`       | Settings lists                                          |
| `@passui/tanstack/document`       | The document shell, with devtools                       |
| `@passui/tanstack/core`           | Framework independent helpers                           |

## Forms

`useAppForm` is TanStack Form with Passui's fields already registered, so a field is one line and carries its label, description and error with it.

```tsx
import { useAppForm } from "@passui/tanstack/forms";

function ProfileForm() {
	const form = useAppForm({
		defaultValues: { name: "", bio: "", newsletter: true },
		onSubmit: async ({ value }) => {
			await saveProfile(value);
		},
	});
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
			className="flex flex-col gap-4"
		>
			<form.AppField name="name">
				{(field) => <field.input label="Name" variant="floating" />}
			</form.AppField>
			<form.AppField name="bio">
				{(field) => <field.textarea label="Bio" />}
			</form.AppField>
			<form.AppField name="newsletter">
				{(field) => <field.switch label="Product news" />}
			</form.AppField>
			<form.AppForm>
				<form.submit label="Save" />
			</form.AppForm>
		</form>
	);
}
```

The fields are `input`, `textarea`, `checkbox`, `switch`, `radioCard`, `multiselect`, `avatar` and `otp`. `input` takes the same `size` and `variant="floating"` as `Input`. The submit button shows a spinner while pending and stays disabled until the form is valid and changed.

Use `withForm` to split a long form into typed sections, and `FormAlert` for an error that belongs to the whole form.

## Tables

`DataTable` is a self contained table on TanStack Table: sorting, search, column visibility, per column filters, row selection and pagination come with it. There is no table state to wire up.

```tsx
import { DataTable } from "@passui/tanstack/tables";

const columns = [
	{ accessorKey: "name", header: "Name" },
	{ accessorKey: "plan", header: "Plan" },
	{ accessorKey: "joined", header: "Joined", meta: { filterVariant: "date" } },
];

<DataTable
	aria-label="Customers"
	data={customers}
	columns={columns}
	getRowId={(row) => row.id}
	onRowClick={(row) => openCustomer(row.id)}
/>;
```

`getRowId` is required so deleting a row never moves another row's state onto it. Add `selectColumn()` for checkboxes and `bulkActions` for what to do with the selection. `isLoading` dims the rows during a refetch instead of emptying the table.

## Mutations

`useAppMutation` wraps TanStack Query's `useMutation` with the things every app writes by hand: an optimistic update that rolls back on error, cache invalidation, and toasts.

```tsx
import { useAppMutation } from "@passui/tanstack/mutation";

const rename = useAppMutation({
	mutationFn: (name: string) => api.rename(name),
	optimisticUpdate: {
		queryKey: ["profile"],
		updater: (old, name) => ({ ...old, name }),
	},
	invalidates: [["profile"]],
	successMessage: "Renamed",
	errorMessage: "Could not rename",
});

rename.mutate("Ada");
```

The rollback only restores the snapshot if nothing else wrote to the same key in the meantime, so a slow failure never erases newer data.

## Route boundaries

Set them once on the router and every route gets a styled error and not found page.

```tsx
import { DefaultBoundary, NotFound } from "@passui/tanstack/route-boundary";

createRouter({
	routeTree,
	defaultErrorComponent: DefaultBoundary,
	defaultNotFoundComponent: () => <NotFound />,
});
```

`DefaultLoader` is a matching pending component for `defaultPendingComponent`.

## Settings lists

`SettingList` is the iOS inset grouped list for a settings page: hairlines between rows, a soft highlight under the pointer, and rows that link with typed router destinations.

```tsx
import { SettingList } from "@passui/tanstack/settings";

<SettingList title="Account" description="How you sign in.">
	<SettingList.Row title="Email" value="ada@example.com" to="/settings/email" />
	<SettingList.Row title="Password" chevron onClick={openPassword} />
	<SettingList.Row
		title="Delete account"
		tone="destructive"
		onClick={openDelete}
	/>
</SettingList>;
```

## Document shell

`ComposeViewport` is the `<html>` and `<body>` of a TanStack Start app. Put `<Scripts />` and devtools in `after`, outside `<main>`, so hydration stays intact.

```tsx
import { ComposeViewport } from "@passui/tanstack/document";

function RootDocument({ children }) {
	return (
		<ComposeViewport>
			<head>
				<HeadContent />
			</head>
			<ComposeViewport.Window after={<Scripts />}>
				{children}
			</ComposeViewport.Window>
		</ComposeViewport>
	);
}
```

`AuthShell` is the matching frame for sign in routes: a centred column with your brand above an `<Outlet />`.

The `/react/<name>` paths are the same modules under an explicit React prefix. Framework libraries are optional peers: install the adapters you import.
