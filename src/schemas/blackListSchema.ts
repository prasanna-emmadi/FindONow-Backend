import { z } from "zod";

export const blackListSchema = z.object({
  token: z.string({
    required_error: "Token is required",
  }),
});

export const requestSchema = z.object({
  body: blackListSchema,
});
