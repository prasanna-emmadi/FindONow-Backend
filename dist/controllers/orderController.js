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
import { ApiError } from "../errors/ApiError.js";
import { ResponseHandler } from "../responses/ResponeHandler.js";
const OrderController = {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield OrderService.findAll();
            //res.json({ list });
            next(ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllOffset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            if (pageNumber < 0) {
                next(ApiError.internal("PageNumber Must be Non Negative"));
                return;
            }
            const list = yield OrderService.getPaginatedOrder(pageNumber, pageSize);
            //res.json({ list });
            next(ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllUserOrdersOffset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (userId.length !== 24) {
                next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            if (pageNumber < 0) {
                next(ApiError.internal("PageNumber Must be Non Negative"));
                return;
            }
            const list = yield OrderService.getPaginatedUserOrder(userId, pageNumber, pageSize);
            //res.json({ list });
            next(ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllUserOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (userId.length !== 24) {
                next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const list = yield OrderService.findAllForUser(userId);
            //res.json({ list });
            next(ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const item = yield OrderService.findOne(orderId);
            if (!item) {
                next(ApiError.resourceNotFound(`OrderId ${orderId} is not found`));
            }
            next(ResponseHandler.resourceFetched(JSON.stringify(item)));
        });
    },
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            if (!order) {
                next(ApiError.internal("Details are Required"));
                return;
            }
            const newOrder = yield OrderService.createOne(order);
            next(ResponseHandler.resourceCreated(JSON.stringify(newOrder), `Order with ${newOrder._id} has been added`));
        });
    },
    updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const updatedOrder = req.body;
            if (!updatedOrder) {
                next(ApiError.internal("Details are Required"));
                return;
            }
            const order = yield OrderService.updateOne(orderId, updatedOrder);
            if (!order) {
                next(ApiError.resourceNotFound("Order not found"));
                return;
            }
            next(ResponseHandler.resourceUpdated(JSON.stringify(order), `Order with ${order._id} has been updated`));
        });
    },
    deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const order = yield OrderService.deleteOne(orderId);
            if (!order) {
                next(ApiError.resourceNotFound("Order not found"));
                return;
            }
            next(ResponseHandler.resourceDeleted(JSON.stringify(order), `Order with ${order._id} has been deleted`));
        });
    }
};
export default OrderController;
