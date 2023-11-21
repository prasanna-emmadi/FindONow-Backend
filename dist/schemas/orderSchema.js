"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    userId: zod_1.z.string({
        required_error: "User ID is required",
    }),
    date: zod_1.z.string({
        required_error: "Date is required",
    }),
    totalAmount: zod_1.z.number({
        required_error: "Total amount is required",
    }),
});
exports.requestSchema = zod_1.z.object({
    body: exports.orderSchema,
});
