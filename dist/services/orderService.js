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
const mongoose_1 = __importDefault(require("mongoose"));
const Order_js_1 = __importDefault(require("../models/Order.js"));
function getPaginatedOrder(pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield Order_js_1.default.find().skip(pageNumber).limit(pageSize).exec();
        return orders;
    });
}
function getPaginatedUserOrder(userId, pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield Order_js_1.default.find({ userId }).skip(pageNumber).limit(pageSize).exec();
        return orders;
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield Order_js_1.default.find().exec();
        return orders;
    });
}
function findAllForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield Order_js_1.default.find({ userId }).exec();
        return orders;
    });
}
function findOne(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const oid = new mongoose_1.default.Types.ObjectId(orderId);
        const category = yield Order_js_1.default.findById(oid).exec();
        return category;
    });
}
function createOne(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrder = new Order_js_1.default(order);
        return yield newOrder.save();
    });
}
function updateOne(orderId, updatedOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(orderId);
        const order = yield Order_js_1.default.findById(id);
        if (!order) {
            return undefined;
        }
        // Update category fields
        order.totalAmount = updatedOrder.totalAmount;
        yield order.save();
        return order;
    });
}
function deleteOne(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose_1.default.Types.ObjectId(orderId);
        const order = yield Order_js_1.default.findById(id);
        if (!order) {
            return undefined;
        }
        const deletedOrder = yield Order_js_1.default.deleteOne({ _id: id });
        if (deletedOrder.deletedCount === 0) {
            return undefined;
        }
        return order;
    });
}
exports.default = {
    findOne,
    findAll,
    createOne,
    updateOne,
    deleteOne,
    findAllForUser,
    getPaginatedOrder,
    getPaginatedUserOrder
};
//# sourceMappingURL=orderService.js.map