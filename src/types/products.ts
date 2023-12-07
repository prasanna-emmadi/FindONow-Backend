import { z } from "zod";
import { productSchema } from "../schemas/productSchema";

export type Product = z.infer<typeof productSchema> & {
  _id: string;
  categoryId: string;
};
