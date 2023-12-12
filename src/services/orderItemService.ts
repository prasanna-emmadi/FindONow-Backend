import mongoose from "mongoose";
import OrderDetailRepo from "../models/OrderItem";
import { OrderDetail } from "../types/orderItems";

async function getPaginatedOrderDetail(pageNumber: number, pageSize: number) {
  const skip = (pageNumber - 1) * pageSize;
  const orders = await OrderDetailRepo.find().skip(skip).limit(pageSize).exec();
  return orders;
}

async function findAll() {
  const orderDetails = await OrderDetailRepo.find()
    .populate("orderId")
    .populate("product")
    .exec();

  return orderDetails;
}

async function findByOrderId(orderId: string) {
  const orderDetails = await OrderDetailRepo.find({ orderId: orderId })
    .populate("product")
    .exec();
  return orderDetails;
}

async function findone(orderDetailId: string) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  const orderDetail = await OrderDetailRepo.findById(id).exec();

  return orderDetail;
}

async function createOne(orderDetail: OrderDetail) {
  const newOrderDetail = new OrderDetailRepo(orderDetail);
  return await newOrderDetail.save();
}

async function findOneAndUpdate(
  orderDetailId: string,
  orderDetail: OrderDetail
) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  return await OrderDetailRepo.findByIdAndUpdate(id, orderDetail, {
    new: true,
  });
}

async function findOneAndDelete(orderDetailId: string) {
  const id = new mongoose.Types.ObjectId(orderDetailId);
  return await OrderDetailRepo.findByIdAndDelete(id);
}

export default {
  findone,
  findAll,
  findByOrderId,
  createOne,
  findOneAndUpdate,
  findOneAndDelete,
  getPaginatedOrderDetail,
};
