import { toast } from "sonner";
import { axios } from "../lib/axios";

export const createTodo = async (data) => {
  try {
    const res = await axios.post("/todos", data);
    toast.success("Todo added");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create todo");
  }
};

export const toggleTodo = async (todo) => {
  try {
    const res = await axios.patch(`/todos/${todo?._id}`, {
      isComplete: !todo?.isComplete,
    });
    toast.success("Todo updated");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update todo");
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`/todos/${id}`);
    toast.success("Todo deleted");
  } catch {
    toast.error("Failed to delete todo");
  }
};
