"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = __importDefault(require("../controllers/userController.js"));
const userValidate_js_1 = require("../middlewares/userValidate.js");
const router = express_1.default.Router();
router.get("/", userController_js_1.default.findAllUser);
router.get("/:userId", userController_js_1.default.findOneUser);
router.post("/", userValidate_js_1.validateUser, userController_js_1.default.createOneUser);
router.put("/:userId", userController_js_1.default.findOneAndUpdate);
router.delete("/:userId", userController_js_1.default.findOneAndDelete);
router.post("/signup", userController_js_1.default.signup);
//router.post("/login", UserController.login)  
// router.use((req, res, next) => {
//     console.log("👀 got here")
//     res.on("finish", () => {
//       console.log("Record created:", {
//         /* log data */
//       })
//     })
//     next()
//   })
exports.default = router;
