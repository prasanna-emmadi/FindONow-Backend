import mongoose, { Document } from "mongoose";

export interface Product extends Document {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: mongoose.Types.ObjectId;
}

const ProductSchema = new mongoose.Schema<Product>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String, required: true }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.model<Product>("Product", ProductSchema);
