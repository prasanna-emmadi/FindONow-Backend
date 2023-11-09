import { z } from  "zod"

export const orderSchema = z.object({
    name: z.string({
        required_error: "Name is reqiured",
    }),
})

export const requestSchema = z.object({
    body: orderSchema,
})