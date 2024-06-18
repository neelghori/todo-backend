import { CreateTodoRequestBody } from "../Types/Common";
import { Todo } from "../database/Schema/TodoSchema";

class TodoModal {
  async createTodo(data: CreateTodoRequestBody) {
    const result = await Todo.create(data);
    if (!result) {
      return {
        error: true,
        message: "Todo Create Failed",
      };
    }
    return {
      ...result,
    };
  }
  async EditTaskTodo(taskId: string, data: any) {
    const isExist = await Todo.findOne({
      _id: taskId,
    });
    if (!isExist) {
      return {
        error: true,
        message: "Invalid Todo id",
      };
    }
    const result = await Todo.updateOne(
      {
        _id: taskId,
      },
      {
        $set: {
          name: data.name,
          date: data.date,
          status: data.status,
          image: data.image,
        },
      }
    );
    if (!result) {
      return {
        error: true,
        message: "Todo Update Failed",
      };
    }
    return {
      ...result,
    };
  }

  async deleteTodoTask(task_id: string) {
    const isExist = await Todo.findOne({
      _id: task_id,
    });
    if (!isExist) {
      return {
        error: true,
        message: "Invalid Todo id",
      };
    }
    return await Todo.deleteOne({ _id: task_id });
  }
  async listSmartCard() {
    const result = await Todo.find();
    return result;
  }
}

export const TodoModals = new TodoModal();
