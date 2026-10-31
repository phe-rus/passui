import { expect, test } from "vitest"
import api from "../domains/catalog/react-api.generated.json"
import { getCatalog } from "../domains/catalog/get-catalog"
import { getSetup } from "../domains/catalog/get-setup"

test("every documented React family has a source-derived API", () => {
    expect(Object.keys(api).sort()).toEqual(
        getCatalog()
            .map((entry) => entry.docs.slug)
            .sort()
    )
})
test("API references expose actual callbacks and refs, not just demo controls", () => {
    expect(
        api.button.props.find((prop) => prop.name === "ref")
            ?.type
    ).toBe("Ref<HTMLButtonElement>")
    expect(
        api.button.props.find(
            (prop) => prop.name === "variant"
        )?.type
    ).toContain('"accent"')
    expect(
        api.picker.props.find(
            (prop) => prop.name === "onChange"
        )?.type
    ).toContain("T")
    expect(
        api.dialog.props.find(
            (prop) => prop.name === "onOpenChange"
        )?.type
    ).toContain("boolean")
    expect(
        api["context-menu"].props.map((prop) => prop.name)
    ).toEqual(["items"])
    expect(
        api.conversation.parts.map((part) => part.name)
    ).toEqual([
        "Conversation.Messages",
        "Conversation.Composer",
    ])
    expect(
        api["search-list"].parts.some(
            (part) => part.name === "SearchListField"
        )
    ).toBe(true)
})
test("host-based APIs explain their one-time installation", () => {
    for (const slug of ["toast", "tooltip", "context-menu"])
        expect(getSetup(slug)?.code).toContain(
            "@passui/react"
        )
    expect(getSetup("button")).toBeUndefined()
})
