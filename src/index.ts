import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import cors from "cors";
import { databaseConnection } from "./database/connection";
import { responseHandler } from "./utils/handler/reponseHandler";
import { ErrorHandler } from "./utils/handler/ErrorHandler";
import { todoRouter } from "./routes/Todo";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { TodoModals } from "./models/todo";
import path from "path";
dotenv.config();

const app = express();
const port = process.env.PORT || 3003;
const photosPath = path.join(__dirname, "photos");

app.use("/images", express.static(photosPath));

// ------------------------- DATABSE CONNECTION  ------------------------------
databaseConnection();

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
const server = createServer(app);
// socket io initialize
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected0", socket.id);
  });
  socket.on("addtodo", async (todo) => {
    const data = await TodoModals.listSmartCard();
    io.emit("newtodo", [...data]);
  });
  socket.on("deleteTodo", async (todo) => {
    const data = await TodoModals.listSmartCard();
    io.emit("deleteTodoEmit", [...data]);
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
