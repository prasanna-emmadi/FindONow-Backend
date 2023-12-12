import { z } from "zod";
import { orderSchema, requestBodySchema } from "../schemas/orderSchema";

type OrderDTO = z.infer<typeof orderSchema>;
type CreateOrderDTO = z.infer<typeof requestBodySchema>;

export type Order = OrderDTO & {
  id: string;
};

export type CreateOrder = CreateOrderDTO