import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { TspecDocsMiddleware } from "tspec";
import "dotenv/config";
import categoryRoute from "./routes/categoriesRoute";
import productsRoute from "./routes/productsRoute";
import usersRoute from "./routes/usersRoute";
import { loggingMiddleware } from "./middlewares/logging";
import { routeNotFound } from "./middlewares/routeNotFound";
import orderRoute from "./routes/orderRoute";
import { checkAuth } from "./middlewares/checkAuth";
import { responseHandler } from "./middlewares/responsehandler";
import orderDetailsRoute from "./routes/orderItemsRoute";
import authRoute from "./routes/authRoute";
import upload from "./middlewares/fileUploader";
import multer from "multer";

const mupload = upload.single("file");

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  const mongoURL = process.env.DB_URL as string;
  console.log("mongoURL", mongoURL);
  mongoose.connect(mongoURL).then(() => console.log("Connected!"));
}

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/orderItems", orderDetailsRoute);
app.post(
  "/api/v1/upload",
  upload.single("file"),
  /*function (req, res) {
    mupload(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        console.error("multer error", err);
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
        console.error("multer unknown error", err);
      }

      // Everything went fine.
    });
  },*/
  (req: Request, res: Response) => {
    // Handle the uploaded file
    console.log("filename", req?.file?.filename);

    res.json({
      message: "File uploaded successfully!",
      fileName: req?.file?.filename,
    });
  }
);

app.use(express.static("uploads"));
app.use("/static", express.static("uploads"));

const initServer = async () => {
  app.use("/api/v1/docs", await TspecDocsMiddleware());

  app.get("/hello", loggingMiddleware, (_, res) => {
    res.json({ msg: "hello, from Express.js!" });
  });

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
};
if (process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "PRODUCTION") {
  initServer().catch((e) => console.error(e));
} else {
  app.use(responseHandler);
  app.use(routeNotFound);
}
export default app;
