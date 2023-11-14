var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import OrderRepo from "../models/Order.js";
function getPaginatedOrder(pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield OrderRepo.find().skip(pageNumber).limit(pageSize).exec();
        return orders;
    });
}
function getPaginatedUserOrder(userId, pageNumber, pageSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield OrderRepo.find({ userId }).skip(pageNumber).limit(pageSize).exec();
        return orders;
    });
}
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield OrderRepo.find().exec();
        return orders;
    });
}
function findAllForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield OrderRepo.find({ userId }).exec();
        return orders;
    });
}
function findOne(orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const oid = new mongoose.Types.ObjectId(orderId);
        const category = yield OrderRepo.findById(oid).exec();
        return category;
    });
}
function createOne(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const newOrder = new OrderRepo(order);
        return yield newOrder.save();
    });
}
function updateOne(orderId, updatedOrder) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(orderId);
        const order = yield OrderRepo.findById(id);
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
        const id = new mongoose.Types.ObjectId(orderId);
        const order = yield OrderRepo.findById(id);
        if (!order) {
            return undefined;
        }
        const deletedOrder = yield OrderRepo.deleteOne({ _id: id });
        if (deletedOrder.deletedCount === 0) {
            return undefined;
        }
        return order;
    });
}
export default {
    findOne,
    findAll,
    createOne,
    updateOne,
    deleteOne,
    findAllForUser,
    getPaginatedOrder,
    getPaginatedUserOrder
};
