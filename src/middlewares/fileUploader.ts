import multer from "multer";
import { Request } from "express";
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (_req: Request, file, cb) => {
    console.log("destination ");
    cb(null, "uploads/");
  },
  filename: (req: Request, file, cb) => {
    const fullFileName = Date.now() + "-" + file.originalname;
    console.log("destination ", fullFileName);
    cb(null, fullFileName);
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

export default upload;
