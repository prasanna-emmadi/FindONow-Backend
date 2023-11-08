var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProductRepo from "../models/Product.js";
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield ProductRepo.find().exec();
        return products;
    });
}
function findOne(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield ProductRepo.findById(productId);
        return product;
    });
}
function createOne(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = new ProductRepo(product);
        return yield newProduct.save();
    });
}
function updateOne(productId, updatedProduct) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield ProductRepo.findByIdAndUpdate(productId, updatedProduct, { new: true });
        return product;
    });
}
function deleteOne(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield ProductRepo.findByIdAndDelete(productId);
        return product;
    });
}
export default {
    findOne,
    findAll,
    createOne,
    updateOne,
    deleteOne,
};
