import express from "express";
import ProductController from "../controllers/productsController.js";
import { validateProduct } from "../middlewares/productValidate.js";

const router = express.Router();

router.get("/", ProductController.findAllProduct);
router.get("/:productId", ProductController.findOneProduct);
router.post("/", validateProduct, ProductController.createOneProduct);
router.put("/:productId", validateProduct, ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

export default router;