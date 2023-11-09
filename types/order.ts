import { z } from "zod";
import { orderSchema } from "../schemas/orderSchema.js"

type OrderDTO = z.infer<typeof orderSchema>;

export type Order = OrderDTO & {
  userId: string; 
  date: string;
  totalAmount: number;
};