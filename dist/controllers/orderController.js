var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OrderService from "../services/orderService.js";
export class OrderController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const list = yield OrderService.findAll();
            res.json({ list });
        });
    }
    getAllOffset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const list = yield OrderService.getPaginatedOrder(pageNumber, pageSize);
            res.json({ list });
        });
    }
    getAllUserOrdersOffset(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const list = yield OrderService.getPaginatedUserOrder(userId, pageNumber, pageSize);
            res.json({ list });
        });
    }
    getAllUserOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const list = yield OrderService.findAllForUser(userId);
            res.json({ list });
        });
    }
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const item = yield OrderService.findOne(orderId);
            if (item) {
                res.json(item);
            }
            else {
                res.status(404).json({ code: 404, error: "Order not found" });
            }
        });
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            if (order) {
                const newCategory = yield OrderService.createOne(order);
                res.status(201).json(newCategory);
            }
            else {
                res.status(400).json({ code: 404, error: "Details are Required" });
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const updatedOrder = req.body;
            if (updatedOrder) {
                const order = yield OrderService.updateOne(orderId, updatedOrder);
                if (order) {
                    res.json({ message: `${JSON.stringify(order)} has been updated` });
                }
                else {
                    res.status(404).json({ code: 404, error: "Order not found" });
                }
            }
            else {
                res.status(400).json({ code: 404, error: "Details are Required" });
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            const order = yield OrderService.deleteOne(orderId);
            if (order) {
                res.json({
                    message: `Order ${orderId} has been deleted successfully`,
                });
            }
            else {
                res.status(404).json({ code: 404, error: "Order not found" });
            }
        });
    }
}
