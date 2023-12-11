import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import categoryRoute from "./routes/categoriesRoute";
import productsRoute from "./routes/productsRoute";
import usersRoute from "./routes/usersRoute";
import { loggingMiddleware } from "./middlewares/logging";
import { routeNotFound } from "./middlewares/routeNotFound";
import orderRoute from "./routes/orderRoute";
import { checkAuth } from "./middlewares/checkAuth";
import { responseHandler } from "./middlewares/responsehandler";
import orderDetailsRoute from "./routes/orderDetailsRoute";
import authRoute from "./routes/authRoute";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());
// TODO: Validate .env using Zod
if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  const mongoURL = process.env.DB_URL as string;
  mongoose.connect(mongoURL).then(() => console.log("Connected!"));
}

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:" + PORT,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" });
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/orderDetails", orderDetailsRoute);

app.get("/api/v1/protected", checkAuth, (req, res) => {
  res.json({ items: [1, 2, 3, 4, 5] });
});

app.use(responseHandler);
app.use(routeNotFound);

if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
  });
}
export default app;
