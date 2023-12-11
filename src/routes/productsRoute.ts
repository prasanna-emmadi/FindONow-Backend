import express from "express";
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

export default router;
