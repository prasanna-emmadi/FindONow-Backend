import express from "express";
import UserController from "../controllers/userController";
import { validateUser } from "../middlewares/userValidate";

const router = express.Router();

router.get("/", UserController.findAllUser);
router.get("/:userId", UserController.findOneUser);
router.post("/", validateUser, UserController.createOneUser);
router.put("/:userId", UserController.findOneAndUpdate);
router.delete("/:userId", UserController.findOneAndDelete);
router.get("/offset", UserController.getOffsetUser);

export default router;
