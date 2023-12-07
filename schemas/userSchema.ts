import { z } from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "Name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  password: z.string(),
  role: z.string({
    required_error: "role is required",
  }),
});

export const requestSchema = z.object({
  body: userSchema,
});
