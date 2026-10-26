import { expect, test } from "vitest"
import api from "@/domains/framework/solid-api.json"

test("Solid API reference uses the native Solid component contracts", () => {
    expect(api.button).toContainEqual({
        name: "variant",
        type: "ButtonVariant",
        required: false,
    })
    expect(api["icon-button"]).toContainEqual({
        name: "label",
        type: "string",
        required: true,
    })
    expect(api["status-indicator"]).toContainEqual({
        name: "state",
        type: "keyof typeof dots",
        required: true,
    })
    expect(api.button.some((prop) => prop.name === "asChild")).toBe(false)
})
