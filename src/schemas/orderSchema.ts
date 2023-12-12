import { z } from "zod";
import { orderDetailWithoutOrderIdSchema } from "./orderItemSchema";

export const orderSchema = z.object({
  userId: z.string({
    required_error: "User ID is required",
  }),
  date: z.string({
    required_error: "Date is required",
  }),
  totalAmount: z.number({
    required_error: "Total amount is required",
  }),
  orderItems: z.array(
    z.string({
      required_error: "OrderItemId is required",
    })
  ),
});

export const requestBodySchema = orderSchema.extend({
  orderItems: z.array(orderDetailWithoutOrderIdSchema),
});

export const requestSchema = z.object({
  body: requestBodySchema,
});
