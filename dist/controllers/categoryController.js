var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CategoryService from "../services/categoryService.js";
export class CategoryController {
    getAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield CategoryService.findAll();
            res.json({ list });
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.id;
            const item = yield CategoryService.findOne(categoryId);
            if (item) {
                res.json(item);
            }
            else {
                res.status(404).json({ code: 404, error: "Category not found" });
            }
        });
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = req.body;
            if (category) {
                const newCategory = yield CategoryService.createOne(category);
                res.status(201).json(newCategory);
            }
            else {
                res.status(400).json({ code: 404, error: "Details are Required" });
            }
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.id;
            const name = req.body;
            if (name) {
                const category = yield CategoryService.updateOne(categoryId, name);
                if (category) {
                    res.json({ message: `${JSON.stringify(category)} has been updated` });
                }
                else {
                    res.status(404).json({ code: 404, error: "Category not found" });
                }
            }
            else {
                res.status(400).json({ code: 404, error: "Details are Required" });
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryId = req.params.id;
            const category = yield CategoryService.deleteOne(categoryId);
            if (category) {
                res.json({
                    message: `Category ${categoryId} has been deleted successfully`,
                });
            }
            else {
                res.status(404).json({ code: 404, error: "Category not found" });
            }
        });
    }
}
