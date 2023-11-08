import { NextFunction, Request, Response } from "express";
import ProductsService from "../services/productsService.js";
import { ApiError } from "../errors/ApiError.js";
import { Product } from "../types/productsTypes.js";

const ProductController = {
  async findAllProduct(_: Request, res: Response) {
    const products = await ProductsService.findAll();
    res.json({ products });
  },

  async findOneProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const productId = req.params.productId;
    const product = await ProductsService.findOne(productId);

    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ product });
  },

  async createOneProduct(req: Request, res: Response) {
    const newProduct: Product = req.body;
    const product = await ProductsService.createOne(newProduct);

    res.status(201).json({ product });
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const updatedProduct: Product = req.body;
    const product = await ProductsService.updateOne(productId, updatedProduct);

    if (!product) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ product });
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    const productId = req.params.productId;
    const deletedProduct = await ProductsService.deleteOne(productId);

    if (!deletedProduct) {
      next(ApiError.resourceNotFound("Product not found."));
      return;
    }

    res.json({ message: "Product deleted successfully" });
  },
};

export default ProductController;
