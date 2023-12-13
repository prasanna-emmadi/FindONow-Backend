import { Router } from "express";
import { Tspec } from "tspec";
import CategoryController from "../controllers/categoryController";
import { checkAuth, checkIsAdmin } from "../middlewares/checkAuth";

const router = Router();

router.post("/", [checkAuth, checkIsAdmin], CategoryController.createCategory);

router.get("/", CategoryController.getAllCategories);
router.get("/offset/", CategoryController.getOffset);
router.get("/:id", CategoryController.getCategoryById);
router.put(
  "/:id",
  [checkAuth, checkIsAdmin],
  CategoryController.updateCategory
);
router.delete(
  "/:id",
  [checkAuth, checkIsAdmin],
  CategoryController.deleteCategory
);

/** Category schema Info */
interface Category {
  /** Category ID */
  id: number;
  /** Name of the category */
  name: string;
  /** Image of the category */
  image: string;
}

export type CategoryApiSpec = Tspec.DefineApiSpec<{
  tags: ["Category"];
  paths: {
    "/categories/": {
      get: {
        summary: "Gets all categories";
        responses: { 200: Category[] };
      };
      post: {
        summary: "Creates category";
        body: Category;
        responses: { 201: Category; 400: "bad request", 403: "Forbidden"; 404: "Not found" };
      };
    };
    "/categories/{id}": {
      get: {
        summary: "Get category by id";
        path: { id: number };
        responses: { 200: Category };
      };
      put: {
        summary: "Updates category by id";
        path: { id: number };
        body: Category;
        responses: { 201: Category; 403: "Forbidden"; 404: "Not found" };
      };
      delete: {
        summary: "Deletes category by id";
        path: { id: number };
        body: Category;
        responses: { 201: Category; 403: "Forbidden"; 404: "Not found" };
      };
    };
  };
}>;

export default router;
