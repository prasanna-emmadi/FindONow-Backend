import express from "express";
import { Tspec } from "tspec";
import UserController from "../controllers/userController";
import { validateUser } from "../middlewares/userValidate";

const router = express.Router();

router.get("/", UserController.findAllUser);
router.get("/:userId", UserController.findOneUser);
router.post("/", validateUser, UserController.createOneUser);
router.put("/:userId", UserController.findOneAndUpdate);
router.delete("/:userId", UserController.findOneAndDelete);
router.get("/offset", UserController.getOffsetUser);


/** User schema Info */
interface User {
  /** User ID */
  _id: string;
  /** Name of the User */
  name: string;
  /** Email Id */
  email: string;
  /** Password of the User */
  password: string;
  /** Price at time of purchase */
  role: "ADMIN" | "USER";
}

export type UserApiSpec = Tspec.DefineApiSpec<{
  tags: ["User"];
  paths: {
    "/users/": {
      get: {
        summary: "Gets all Users";
        responses: { 200: User[] };
      };
      post: {
        summary: "Creates User";
        body: User;
        responses: {
          201: User;
          400: "bad request";
          403: "Forbidden";
          404: "Not found";
        };
      };
    };
    "/users/{id}": {
      get: {
        summary: "Get User by id";
        path: { id: number };
        responses: { 200: User };
      };
      put: {
        summary: "Updates User by id";
        path: { id: number };
        body: User;
        responses: { 201: User; 403: "Forbidden"; 404: "Not found" };
      };
      delete: {
        summary: "Deletes User by id";
        path: { id: number };
        body: User;
        responses: { 201: User; 403: "Forbidden"; 404: "Not found" };
      };
    };
  };
}>;


export default router;
