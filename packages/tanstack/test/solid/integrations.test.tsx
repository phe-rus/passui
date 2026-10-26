/** @jsxImportSource solid-js */
import { renderToString } from "solid-js/web"
import { expect, test } from "vitest"
import { createAppForm } from "../../src/solid/forms"
import {
    DataTable,
    selectColumn,
} from "../../src/solid/tables"
import { ComposeViewport } from "../../src/solid/document"
import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/solid-query"
import { createAppMutation } from "../../src/solid/mutation"

function FormFixture() {
    const form = createAppForm(() => ({
        defaultValues: { name: "Aiko" },
        onSubmit: async () => {},
    }))
    return (
        <form.AppField name="name">
            {(field) => <field.input label="Name" />}
        </form.AppField>
    )
}
test("Solid form binding renders a real labelled field with its default value", () => {
    const html = renderToString(FormFixture)
    expect(html).toContain("Aiko")
    expect(html).toContain("Name")
    expect(html).toContain('name="name"')
})
test("Solid table renders actual rows, selection controls, headers and pagination", () => {
    const html = renderToString(() => (
        <DataTable
            data={[
                { id: "1", name: "Aiko" },
                { id: "2", name: "Kito" },
            ]}
            columns={[
                selectColumn(),
                {
                    accessorKey: "name",
                    header: "Name",
                    cell: (info) => String(info.getValue()),
                },
            ]}
        />
    ))
    expect(html).toContain("Aiko")
    expect(html).toContain("Kito")
    expect(html).toContain('type="checkbox"')
    expect(html).toContain("Next")
})
test("Solid document keeps framework scripts after main", () => {
    const html = renderToString(() => (
        <ComposeViewport lang="sw">
            <head>
                <title>Solid</title>
            </head>
            <ComposeViewport.Window
                after={<script id="framework" />}
            >
                Content
            </ComposeViewport.Window>
        </ComposeViewport>
    ))
    expect(html).toContain('lang="sw"')
    expect(html.indexOf('id="framework"')).toBeGreaterThan(
        html.indexOf("</main>")
    )
})
function MutationFixture() {
    const mutation = createAppMutation(() => ({
        mutationFn: async (value: string) => value,
        onSuccess: (value) => {
            const result: string = value
            void result
        },
    }))
    return <output>{mutation.status}</output>
}

test("Solid mutation binds to its own QueryClientProvider during SSR", () => {
    const client = new QueryClient()
    const html = renderToString(() => (
        <QueryClientProvider client={client}>
            <MutationFixture />
        </QueryClientProvider>
    ))
    expect(html).toContain("idle")
    client.clear()
})
