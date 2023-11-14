import { Router } from 'express';

import { OrderController } from '../controllers/orderController.js';

const orderController = new OrderController();
const router = Router();

router.post("/", (req, res) =>
    orderController.createOrder(req, res)
);

router.get("/user/:id", (req, res) =>
    orderController.getAllUserOrders(req, res)
);


router.get("/offset", (req, res) =>
    orderController.getAllOffset(req, res)
);

router.get("/user/:id/offset", (req, res) =>
    orderController.getAllUserOrdersOffset(req, res)
);


router.get("/", (req, res) =>
    orderController.getAll(req, res)
);


router.get('/:id', (req, res) =>
orderController.getOrder(req, res)
);
router.put("/:id", (req, res) =>
orderController.updateOrder(req, res)
);
router.delete("/:id", (req, res) =>
orderController.deleteOrder(req, res)
);
router.use((req, res, next) => {
  console.log("👀 got here")
  res.on("finish", () => {
    console.log("Record created:", {
      req
      /* log data */
    })
  })
  next()
})

export default router;
