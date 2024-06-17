import { Response } from "express";

export interface ResponseHandler<T> {
  res: Response;
  message: string;
  data: T;
  statusCode: number;
  status: number;
  errors: string;
}

export interface CustomResponse extends Response {
  handler: any;
  errorHandler: any;
}

export interface CreateTodoRequestBody {
  title: string;
  status: string;
  date: string;
  image: string;
}
