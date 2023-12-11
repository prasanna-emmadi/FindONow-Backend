import express from "express";
import AuthController from "../controllers/authController";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.get("/profile", checkAuth, AuthController.profile);

export default router;
