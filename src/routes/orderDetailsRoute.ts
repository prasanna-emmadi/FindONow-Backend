import express from "express";

import OrderDetailController from "../controllers/orderDetailsController";
import { validateOrderDetail } from "../middlewares/orderDetailValidate";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/", [checkAuth], OrderDetailController.findAllOrderDetail);
router.get(
  "/:orderDetailId",
  [checkAuth],
  OrderDetailController.findOneOrderDetail
);
router.get("/offset", [checkAuth], OrderDetailController.findOrderDetailOffset);
router.post(
  "/",
  [checkAuth, validateOrderDetail],
  OrderDetailController.createOneOrderDetail
);
router.put(
  "/:orderDetailId",
  [checkAuth, validateOrderDetail],
  OrderDetailController.findOneAndUpdate
);
router.delete(
  "/:orderDetailId",
  [checkAuth],
  OrderDetailController.findOneAndDelete
);
router.use((req, res, next) => {
  res.on("finish", () => {
    console.log("Record created:", {
      /*log data */
    });
  });
  next();
});
export default router;
