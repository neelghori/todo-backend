import { ResponseHandler } from "../../Types/Common";

export const responseHandler = ({
  res,
  message,
  data,
  statusCode,
  status,
  errors,
}: ResponseHandler<any>) => {
  res.status(statusCode ? statusCode : 200).json({
    status: {
      code: statusCode ? statusCode : 200,
      status: status ? Boolean(status) : true,
    },
    message: message ? message : "Success",
    data: data || null,
    errors: errors || null,
  });
};
