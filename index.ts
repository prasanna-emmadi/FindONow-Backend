import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import itemsRoute from "./routes/itemsRoute.js";
import categoryRoute from "./routes/categoriesRoute.js";
import productsRoute from "./routes/productsRoute.js";
import usersRoute from "./routes/usersRoute.js";

import orderDetailsRoute from "./routes/orderDetailsRoute.js";

import { loggingMiddleware } from "./middlewares/logging.js"
import { apiErrorHandler } from "./middlewares/error.js"
import { routeNotFound } from "./middlewares/routeNotFound.js"
import orderRoute from "./routes/orderRoute.js"
const jwt= require("jsonwebtoken")
import crypto from "crypto"

const PORT = 8080;
const app = express();

app.use(express.json());

// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL as string;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" });
});

app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/orders", orderRoute)

// for generating secret key
const key = crypto.randomBytes(64).toString("hex")
console.log("Key:",key)
//login code shifted to user controller
app.post("/api/v1/login", (req, res) =>{
  const user = {
    id: 'abcde-fghijk',
    email :'test@test.io',
    password :'12345',
  }
  
  if(req.body.email !== user.email || req.body.password !== user.password){
    return res.json({
      msg:'Invalid credential'
    })
  }
  const payload = {
    userId: user.id,
    email :user.email,
  }
 const token = jwt.sign(payload,"secret")
  //const token = jwt.sign(payload, process.env.TOKEN_SECRET as string)
  console.log("Token:",token)
  res.json({token})
});

app.use(apiErrorHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`);
});
