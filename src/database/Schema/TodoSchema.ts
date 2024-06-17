import mongoose from "mongoose";
import moment from "moment";
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  created_at: {
    type: String,
    default: moment().format("MMM DD YYYY HH:mm:ss"),
  },
  updated_at: {
    type: String,
    default: moment().format("MMM DD YYYY HH:mm:ss"),
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
