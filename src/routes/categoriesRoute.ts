import { Router } from "express";
import { Tspec } from "tspec";
import CategoryController from "../controllers/categoryController";
import { checkAuth, checkIsAdmin } from "../middlewares/checkAuth";
import { Category } from "../types/category";

export type CategoryApiSpec = Tspec.DefineApiSpec<{
  paths: {
    "/category/{id}": {
      get: {
        summary: "Get category by id";
        path: { id: number };
        responses: { 200: Category };
      };
    };
  };
}>;
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
/*
router.use((req, res, next) => {
  console.log("👀 got here")
  res.on("finish", () => {
    console.log("Record created:", {
    //   log data 
    })
  })
  next()
})
*/
export default router;
