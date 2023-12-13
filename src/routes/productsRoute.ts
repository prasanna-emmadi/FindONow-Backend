import express from "express";
import { Tspec } from "tspec";
import ProductController from "../controllers/productsController";
import { validateProduct } from "../middlewares/productValidate";
import { checkAuth, checkIsAdmin } from "../middlewares/checkAuth";

const router = express.Router();

// TODO checkAuth
router.get("/", ProductController.findAllProduct);
router.get("/:productId", ProductController.findOneProduct);
router.post(
  "/",
  [checkAuth, checkIsAdmin, validateProduct],
  ProductController.createOneProduct
);
router.put(
  "/:productId",
  [checkAuth, checkIsAdmin, validateProduct],
  ProductController.updateProduct
);
router.delete(
  "/:productId",
  checkAuth,
  checkIsAdmin,
  ProductController.deleteProduct
);
/** Product schema Info */
interface Product {
  /** Product ID */
  _id: string;
  /** Title of the Product */
  title: string;
  /** Description of the Product */
  description: string;
  /** Price of the Product */
  price: number;
  /** Images of the Product */
  image: string[];
  /** Category Id of the Product */
  category: string;
}

export type ProductApiSpec = Tspec.DefineApiSpec<{
  tags: ["Product"];
  paths: {
    "/products/": {
      get: {
        summary: "Gets all products";
        responses: { 200: Product[] };
      };
      post: {
        summary: "Creates Product";
        body: Product;
        responses: {
          201: Product;
          400: "bad request";
          403: "Forbidden";
          404: "Not found";
        };
      };
    };
    "/products/{id}": {
      get: {
        summary: "Get Product by id";
        path: { id: number };
        responses: { 200: Product };
      };
      put: {
        summary: "Updates Product by id";
        path: { id: number };
        body: Product;
        responses: { 201: Product; 403: "Forbidden"; 404: "Not found" };
      };
      delete: {
        summary: "Deletes Product by id";
        path: { id: number };
        body: Product;
        responses: { 201: Product; 403: "Forbidden"; 404: "Not found" };
      };
    };
  };
}>;

export default router;
