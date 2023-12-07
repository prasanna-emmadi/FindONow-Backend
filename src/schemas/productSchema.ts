import { z } from "zod";

export const productSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  price: z.number({
    required_error: "Price is required",
  }),
  images: z.array(
    z.string({
      required_error: "Image URL is required",
    })
  ),
  category: z.string({
    required_error: "Category ID is required",
  }),
});

export const requestSchema = z.object({
  body: productSchema,
});
