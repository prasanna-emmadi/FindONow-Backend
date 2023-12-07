import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import itemsRoute from "./routes/itemsRoute";
import categoryRoute from "./routes/categoriesRoute";
import productsRoute from "./routes/productsRoute";
import usersRoute from "./routes/usersRoute";
import { loggingMiddleware } from "./middlewares/logging";
import { routeNotFound } from "./middlewares/routeNotFound";
import orderRoute from "./routes/orderRoute";
import { checkAuth } from "./middlewares/checkAuth";
import { responseHandler } from "./middlewares/responsehandler";
import orderDetailsRoute from "./routes/orderDetailsRoute";
import cors from "cors";

const jwt = require("jsonwebtoken");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
// TODO: Validate .env using Zod
if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  const mongoURL = process.env.DB_URL as string;
  mongoose.connect(mongoURL).then(() => console.log("Connected!"));
}

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" });
});

app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/orderDetails", orderDetailsRoute);

app.get("/api/v1/protected", checkAuth, (req, res) => {
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

app.use(responseHandler);
app.use(routeNotFound);

if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
  });
}
export default app;
