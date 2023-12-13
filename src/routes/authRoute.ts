import express from "express";
import { Tspec } from "tspec";
import AuthController from "../controllers/authController";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/profile", checkAuth, AuthController.profile);

/** User schema Info */
interface Signup {
  /** Name of the User */
  name: string;
  /** Email Id */
  email: string;
  /** Password of the User */
  password: string;
  /** Price at time of purchase */
  role: "ADMIN" | "USER";
}

/** Login schema Info */
interface Login {
  /** Email Id */
  email: string;
  /** Password of the User */
  password: string;
}

/** LoginResposne schema Info */
interface LoginResponse {
  /** Access token */
  access_token: string;
  /** Access token */
  refresh_token: string;
}

/** Login schema Info */
interface Profile {
  /** Name of the User */
  name: string;
  /** Email Id */
  email: string;
  /** Price at time of purchase */
  role: "ADMIN" | "USER";
}

export type AuthApiSpec = Tspec.DefineApiSpec<{
  tags: ["Auth"];
  paths: {
    "/auth/signup": {
      post: {
        summary: "Signup for new user";
        body: Signup;
        responses: { 200: "Success" };
      };
    };
    "/auth/login": {
      post: {
        summary: "Login for user";
        body: Login;
        responses: { 200: LoginResponse };
      };
    };
    "/auth/logout": {
      post: {
        summary: "Logout for user";
        responses: { 200: "Success" };
      };
    };

    "/auth/profile": {
      get: {
        summary: "Profile user";
        responses: { 200: Profile };
      };
    };
  };
}>;

export default router;
