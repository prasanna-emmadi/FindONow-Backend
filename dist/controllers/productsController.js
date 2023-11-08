var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ProductsService from "../services/productsService.js";
import { ApiError } from "../errors/ApiError.js";
const ProductController = {
    findAllProduct(_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductsService.findAll();
            res.json({ products });
        });
    },
    findOneProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const product = yield ProductsService.findOne(productId);
            if (!product) {
                next(ApiError.resourceNotFound("Product not found."));
                return;
            }
            res.json({ product });
        });
    },
    createOneProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = req.body;
            const product = yield ProductsService.createOne(newProduct);
            res.status(201).json({ product });
        });
    },
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const updatedProduct = req.body;
            const product = yield ProductsService.updateOne(productId, updatedProduct);
            if (!product) {
                next(ApiError.resourceNotFound("Product not found."));
                return;
            }
            res.json({ product });
        });
    },
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = req.params.productId;
            const deletedProduct = yield ProductsService.deleteOne(productId);
            if (!deletedProduct) {
                next(ApiError.resourceNotFound("Product not found."));
                return;
            }
            res.json({ message: "Product deleted successfully" });
        });
    },
};
export default ProductController;
