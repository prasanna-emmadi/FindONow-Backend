import { z } from "zod";

import { orderDetailSchema } from "../schemas/orderItemSchema";

type OrderDetailDTO = z.infer<typeof orderDetailSchema>;

export type OrderDetail = OrderDetailDTO;
