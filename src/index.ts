import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import cors from "cors";
import { databaseConnection } from "./database/connection";
import { responseHandler } from "./utils/handler/reponseHandler";
import { ErrorHandler } from "./utils/handler/ErrorHandler";
import { todoRouter } from "./routes/Todo";

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

// ------------------------- DATABSE CONNECTION  ------------------------------
databaseConnection();
app.use(express.json());

// ------------------------ GLOBAL MIDDLE WARES -------------------------
app.use(bodyparser.json());
app.use(cors());

// ------------------------    RESPONSE HANDLER    -------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  res.handler = responseHandler;
  next();
});

// ------------------------    Error HANDLER    -------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  //@ts-ignore
  res.errorHandler = ErrorHandler;
  next();
});

// -------------------------- ROUTES ----------------------
app.use("/", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
