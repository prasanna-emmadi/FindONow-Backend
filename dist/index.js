"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const itemsRoute_js_1 = __importDefault(require("./routes/itemsRoute.js"));
const categoriesRoute_js_1 = __importDefault(require("./routes/categoriesRoute.js"));
const productsRoute_js_1 = __importDefault(require("./routes/productsRoute.js"));
const usersRoute_js_1 = __importDefault(require("./routes/usersRoute.js"));
const logging_js_1 = require("./middlewares/logging.js");
const routeNotFound_js_1 = require("./middlewares/routeNotFound.js");
const orderRoute_js_1 = __importDefault(require("./routes/orderRoute.js"));
const jwt = require("jsonwebtoken");
const checkAuth_js_1 = require("./middlewares/checkAuth.js");
const responsehandler_js_1 = require("./middlewares/responsehandler.js");
const PORT = 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL;
mongoose_1.default.connect(mongoURL).then(() => console.log("Connected!"));
app.get("/hello", logging_js_1.loggingMiddleware, (_, res) => {
    res.json({ msg: "hello, from Express.js!" });
});
app.use("/api/v1/items", itemsRoute_js_1.default);
app.use("/api/v1/products", productsRoute_js_1.default);
app.use("/api/v1/categories", categoriesRoute_js_1.default);
app.use("/api/v1/users", usersRoute_js_1.default);
app.use("/api/v1/orders", orderRoute_js_1.default);
app.get("/api/v1/protected", checkAuth_js_1.checkAuth, (req, res) => {
    res.json({ items: [1, 2, 3, 4, 5] });
});
// for generating secret key
// const key = crypto.randomBytes(64).toString("hex")
// console.log("Key:",key)
//login code shifted to user controller
// app.post("/api/v1/login", (req, res) =>{
//   const user = {
//     id: 'abcde-fghijk',
//     email :'test@test.io',
//     password :'12345',
//   }
//   if(req.body.email !== user.email || req.body.password !== user.password){
//     return res.json({
//       msg:'Invalid credential'
//     })
//   }
//   const payload = {
//     userId: user.id,
//     email :user.email,
//   }
//  const token = jwt.sign(payload,"secret")
//   //const token = jwt.sign(payload, process.env.TOKEN_SECRET as string)
//   console.log("Token:",token)
//   res.json({token})
// });
app.use(responsehandler_js_1.responseHandler);
app.use(routeNotFound_js_1.routeNotFound);
app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map