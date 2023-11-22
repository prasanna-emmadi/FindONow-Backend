"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const router = (0, express_1.Router)();
router.post("/", orderController_1.default.createOrder);
router.get("/user/:id", orderController_1.default.getAllUserOrders);
router.get("/offset", orderController_1.default.getAllOffset);
router.get("/user/:id/offset", orderController_1.default.getAllUserOrdersOffset);
router.get("/", orderController_1.default.getAll);
router.get('/:id', orderController_1.default.getOrder);
router.put("/:id", orderController_1.default.updateOrder);
router.delete("/:id", orderController_1.default.deleteOrder);
router.use((req, res, next) => {
    console.log("👀 got here");
    res.on("finish", () => {
        console.log("Record created:", {
            req
            /* log data */
        });
    });
    next();
});
exports.default = router;
//# sourceMappingURL=orderRoute.js.map