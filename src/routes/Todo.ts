import express, { Router } from "express";
import { uploadFile } from "../utils/helper";
import { TodoModals } from "../models/todo";

export const todoRouter: Router = express.Router();

//todo create routes
todoRouter.post(
  "/todo/create",
  uploadFile.single("image"),
  async (req, res, next) => {
    try {
      const reqBody = req.body;
      const data = await TodoModals.createTodo(reqBody);
    } catch (error) {
      console.log("create todo err: ", error);
      //@ts-ignore
      res.errorHandler({ res });
    }
  }
);

//todo update routes
todoRouter.put(
  "/todo/update:id",
  uploadFile.single("image"),
  async (req, res, next) => {
    try {
      const reqBody = req.body;
      const { id } = req.params;
      const data = await TodoModals.EditTaskTodo(id, reqBody);
    } catch (error) {
      console.log("edit todo err: ", error);
      //@ts-ignore
      res.errorHandler({ res });
    }
  }
);

//todo delete routes
todoRouter.delete("/todo/delete:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await TodoModals.deleteTodoTask(id);
  } catch (error) {
    console.log("delete todo err: ", error);
    //@ts-ignore
    res.errorHandler({ res });
  }
});

//todo list routes
todoRouter.get("/todo/", async (req, res, next) => {
  try {
    const data = await TodoModals.listSmartCard();
    //@ts-ignore
    res.handler({ res, message: "Todo fetch successfully", data });
  } catch (err) {
    console.log(" listTodo err: ", err);
    //@ts-ignore
    res.errorHandler({ res });
  }
});
