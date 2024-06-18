import mongoose, { ConnectOptions } from "mongoose";

export const databaseConnection = () => {
  try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions);
    console.log("connected to db");
  } catch (error) {
    console.log("error", error);
  }
};
