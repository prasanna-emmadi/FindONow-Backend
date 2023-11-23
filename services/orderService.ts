import mongoose, { ObjectId } from "mongoose";
import OrderRepo from "../models/Order";
import { Order } from "../types/order";

async function getPaginatedOrder(pageNumber: number, pageSize: number) {
  const orders = await OrderRepo.find().skip(pageNumber).limit(pageSize).exec();

  return orders;
}

async function getPaginatedUserOrder(
  userId: string,
  pageNumber: number,
  pageSize: number
) {
  const orders = await OrderRepo.find({ userId })
    .skip(pageNumber)
    .limit(pageSize)
    .exec();
  return orders;
}

async function findAll() {
  const orders = await OrderRepo.find().exec();

  return orders;
}

async function findAllForUser(userId: string) {
  const orders = await OrderRepo.find({ userId }).exec();

  return orders;
}

async function findOne(orderId: string) {
  const oid = new mongoose.Types.ObjectId(orderId);

  const category = await OrderRepo.findById(oid).exec();

  return category;
}

async function createOne(order: Order) {
  const newOrder = new OrderRepo(order);
  return await newOrder.save();
}

async function updateOne(orderId: string, updatedOrder: Order) {
  const id = new mongoose.Types.ObjectId(orderId);
  const order = await OrderRepo.findById(id);

  if (!order) {
    return undefined;
  }

  // Update category fields
  order.totalAmount = updatedOrder.totalAmount;

  await order.save();
  return order;
}

async function deleteOne(orderId: string) {
  const id = new mongoose.Types.ObjectId(orderId);

  const order = await OrderRepo.findById(id);

  if (!order) {
    return undefined;
  }

  const deletedOrder = await OrderRepo.deleteOne({ _id: id });

  if (deletedOrder.deletedCount === 0) {
    return undefined;
  }

  return order;
}

export default {
  findOne,
  findAll,
  createOne,
  updateOne,
  deleteOne,
  findAllForUser,
  getPaginatedOrder,
  getPaginatedUserOrder,
};
