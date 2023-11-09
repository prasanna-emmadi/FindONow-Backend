import { z } from "zod";

export const orderDetailSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
});

export const requestSchema = z.object({
  body: orderDetailSchema,
});
                                     