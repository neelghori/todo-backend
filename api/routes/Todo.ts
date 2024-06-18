import express, { Router } from "express";
import { uploadFile } from "../utils/helper";
import { TodoModals } from "../models/todo";

export const todoRouter: Router = express.Router();

//todo create routes
todoRouter.post(
  "/todo/create",
  uploadFile.single("image"),
  async (req, res: any, next) => {
    try {
      const reqBody = req.body;
      const addImageFilename = { ...reqBody, image: req?.file?.filename };
      const data: any = await TodoModals.createTodo(addImageFilename);
      if (data?.error) {
        return res.errorHandler({
          res,
          message: data?.message,
          statusCode: 200,
          status: false,
        });
      }
      res.handler({
        res,
        statusCode: 200,
        status: true,
        message: "Todo Create Successfully",
      });
    } catch (error) {
      console.log("create todo err: ", error);
      //@ts-ignore
      res.errorHandler({ res });
    }
  }
);

//todo update routes
todoRouter.put(
  "/todo/update/:id",
  uploadFile.single("image"),
  async (req, res: any, next) => {
    try {
      const reqBody = req.body;
      const { id } = req.params;
      const data = await TodoModals.EditTaskTodo(id, reqBody);
      res.handler({
        res,
        data,
        statusCode: 200,
        status: true,
        message: "Todo Update Successfully",
      });
    } catch (error) {
      console.log("edit todo err: ", error);
      //@ts-ignore
      res.errorHandler({ res });
    }
  }
);

//todo delete routes
todoRouter.delete("/todo/delete/:id", async (req, res: any, next) => {
  try {
    const { id } = req.params;
    const data: any = await TodoModals.deleteTodoTask(id);
    if (data?.error) {
      return res.errorHandler({
        res,
        message: data?.message,
        statusCode: 200,
        status: false,
      });
    }
    res.handler({
      res,
      statusCode: 200,
      status: true,
      message: "Todo Delete Successfully",
    });
  } catch (error) {
    console.log("delete todo err: ", error);
    //@ts-ignore
    res.errorHandler({ res });
  }
});

//todo list routes
todoRouter.get("/todo/", async (req, res: any, next) => {
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
