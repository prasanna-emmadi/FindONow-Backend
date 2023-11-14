import { z } from "zod";

import { orderDetailSchema } from "../schemas/orderDetailSchema.js";

type OrderDetailDTO = z.infer<typeof orderDetailSchema>;

export type OrderDetail = OrderDetailDTO & { id: string };
