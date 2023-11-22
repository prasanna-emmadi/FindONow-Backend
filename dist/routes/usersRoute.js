"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const userValidate_1 = require("../middlewares/userValidate");
const router = express_1.default.Router();
router.get("/", userController_1.default.findAllUser);
router.get("/:userId", userController_1.default.findOneUser);
router.post("/", userValidate_1.validateUser, userController_1.default.createOneUser);
router.put("/:userId", userController_1.default.findOneAndUpdate);
router.delete("/:userId", userController_1.default.findOneAndDelete);
router.post("/signup", userController_1.default.signup);
router.post("/login", userController_1.default.login);
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
//# sourceMappingURL=usersRoute.js.map