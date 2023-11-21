"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orderService_js_1 = __importDefault(require("../services/orderService.js"));
const ApiError_js_1 = require("../errors/ApiError.js");
const ResponeHandler_js_1 = require("../responses/ResponeHandler.js");
const OrderController = {
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield orderService_js_1.default.findAll();
            //res.json({ list });
            next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllOffset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            if (pageNumber < 0) {
                next(ApiError_js_1.ApiError.internal("PageNumber Must be Non Negative"));
                return;
            }
            const list = yield orderService_js_1.default.getPaginatedOrder(pageNumber, pageSize);
            //res.json({ list });
            next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllUserOrdersOffset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (userId.length !== 24) {
                next(ApiError_js_1.ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const pageNumber = Number(req.query.pageNumber) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            if (pageNumber < 0) {
                next(ApiError_js_1.ApiError.internal("PageNumber Must be Non Negative"));
                return;
            }
            const list = yield orderService_js_1.default.getPaginatedUserOrder(userId, pageNumber, pageSize);
            //res.json({ list });
            next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getAllUserOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            if (userId.length !== 24) {
                next(ApiError_js_1.ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const list = yield orderService_js_1.default.findAllForUser(userId);
            //res.json({ list });
            next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(list)));
        });
    },
    getOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError_js_1.ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const item = yield orderService_js_1.default.findOne(orderId);
            if (!item) {
                next(ApiError_js_1.ApiError.resourceNotFound(`OrderId ${orderId} is not found`));
            }
            next(ResponeHandler_js_1.ResponseHandler.resourceFetched(JSON.stringify(item)));
        });
    },
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = req.body;
            if (!order) {
                next(ApiError_js_1.ApiError.internal("Details are Required"));
                return;
            }
            const newOrder = yield orderService_js_1.default.createOne(order);
            next(ResponeHandler_js_1.ResponseHandler.resourceCreated(JSON.stringify(newOrder), `Order with ${newOrder._id} has been added`));
        });
    },
    updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError_js_1.ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const updatedOrder = req.body;
            if (!updatedOrder) {
                next(ApiError_js_1.ApiError.internal("Details are Required"));
                return;
            }
            const order = yield orderService_js_1.default.updateOne(orderId, updatedOrder);
            if (!order) {
                next(ApiError_js_1.ApiError.resourceNotFound("Order not found"));
                return;
            }
            next(ResponeHandler_js_1.ResponseHandler.resourceUpdated(JSON.stringify(order), `Order with ${order._id} has been updated`));
        });
    },
    deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.id;
            if (orderId.length !== 24) {
                next(ApiError_js_1.ApiError.internal("ID must be a 24 character hex string, 12 byte Uint8Array, or an integer"));
                return;
            }
            const order = yield orderService_js_1.default.deleteOne(orderId);
            if (!order) {
                next(ApiError_js_1.ApiError.resourceNotFound("Order not found"));
                return;
            }
            next(ResponeHandler_js_1.ResponseHandler.resourceDeleted(JSON.stringify(order), `Order with ${order._id} has been deleted`));
        });
    }
};
exports.default = OrderController;
