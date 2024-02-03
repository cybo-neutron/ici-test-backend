import { config } from "dotenv";
config();

import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";

import { connectMongooseDB } from "@app/services/databaseService";

// import uploadRoute from "@app/routes/v1/upload/upload";
// import authRoute from "@app/routes/v1/auth";
import UserController from "@app/resources/user/user.controller";


const port = process.env.PORT || 5111;

const app = express();

//midlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

// const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage });

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    status: "Welcome to express yo hi how you doin? yo",
  });
});

// app.use("/v1/upload", uploadRoute);

// app.use(require("@app/routes/v1/auth"));\
// app.use("/v1/auth", authRoute);

const userController = new UserController();
userController.initializeRoutes();
app.use('/api/v1', userController.router);

app.post("/test", upload.array("files"), (req, res) => {
  res.json({
    message: "got it",
  });
});

connectMongooseDB();

app.listen(port, () => {
  console.log(`Server listening to ${port}`);
});
