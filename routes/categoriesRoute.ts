import { Router } from 'express';

import { CategoryController } from '../controllers/categoryController.js';

const categoryController = new CategoryController();
const router = Router();

router.post("/", (req, res) =>
  categoryController.createCategory(req, res)
);
router.get("/", (req, res) =>
  categoryController.getAllCategories(req, res)
);
router.get('/:id', (req, res) =>
  categoryController.getCategoryById(req, res)
);
router.put("/:id", (req, res) =>
  categoryController.updateCategory(req, res)
);
router.delete("/:id", (req, res) =>
  categoryController.deleteCategory(req, res)
);
router.use((req, res, next) => {
  console.log("👀 got here")
  res.on("finish", () => {
    console.log("Record created:", {
      /* log data */
    })
  })
  next()
})

export default router;
