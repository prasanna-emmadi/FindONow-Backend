import express from "express";

import OrderController from "../controllers/ordersControllers.js";
import { validateOrder } from "../middlewares/orderValidate.js";

const router = express.Router();

router.get("/", OrderController.findAllOrder);
router.get("/:orderId", OrderController.findOneOrder);
router.post("/", validateOrder, OrderController.createOneOrder);
router.put("/:orderId", validateOrder, OrderController.findOneAndUpdate);
router.delete("/:orderId", OrderController.findOneAndDelete);
router.use((req, res, next) => {
  console.log("got here");
  res.on("finish", () => {
    console.log("Record created:", {
      /*log data */
    });
  });
  next();
});
export default router;
