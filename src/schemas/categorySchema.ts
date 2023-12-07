import { z } from "zod";

export const categorySchema = z.object({
  id: z.number({
    required_error: "id is required",
  }),
  name: z.string({
    required_error: "Name is required",
  }),
  image: z.string({
    required_error: "Image url is required",
  }),
});

export const requestSchema = z.object({
  body: categorySchema,
});
