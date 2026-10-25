import { z } from "zod"
import { previewSettingsSchema } from "@/domains/settings"

/** Parent to preview: everything the preview should show right now. */
export const stateMessageSchema = z.object({
    type: z.literal("passui:state"),
    settings: previewSettingsSchema,
    props: z.record(z.string(), z.unknown()),
})

/** Parent to preview: are you listening? Answered with passui:ready. */
export const pingMessageSchema = z.object({
    type: z.literal("passui:ping"),
})

/** Everything a preview accepts from its parent. */
export const parentMessageSchema = z.discriminatedUnion(
    "type",
    [stateMessageSchema, pingMessageSchema]
)

/** Preview to parent: it is listening, or its content changed height. */
export const frameMessageSchema = z.discriminatedUnion(
    "type",
    [
        z.object({ type: z.literal("passui:ready") }),
        z.object({
            type: z.literal("passui:size"),
            height: z.number().nonnegative(),
        }),
    ]
)

export type StateMessage = z.infer<typeof stateMessageSchema>
export type FrameMessage = z.infer<typeof frameMessageSchema>
export type ParentMessage = z.infer<
    typeof parentMessageSchema
>
