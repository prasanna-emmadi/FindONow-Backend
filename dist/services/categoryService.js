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
import CategoryRepo from "../models/Category.js";
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield CategoryRepo.find().exec();
        return categories;
    });
}
function findOne(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(categoryId);
        const category = yield CategoryRepo.findById(id).exec();
        return category;
    });
}
function createOne(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = new CategoryRepo(category);
        return yield newProduct.save();
    });
}
function updateOne(categoryId, updatedCategory) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(categoryId);
        const category = yield CategoryRepo.findById(id);
        if (!category) {
            return undefined;
        }
        console.log('category:', category, 'updatedCategory:', updatedCategory);
        // Update category fields
        category.name = updatedCategory.name;
        yield category.save();
        return category;
    });
}
function deleteOne(categoryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(categoryId);
        const category = yield CategoryRepo.findById(id);
        if (!category) {
            return undefined;
        }
        const deletedCategory = yield CategoryRepo.deleteOne({ _id: id });
        if (deletedCategory.deletedCount === 0) {
            return undefined;
        }
        return category;
    });
}
export default {
    findOne,
    findAll,
    createOne,
    updateOne,
    deleteOne
};
