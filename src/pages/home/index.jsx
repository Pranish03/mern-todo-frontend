import { useEffect } from "react";
import { FiPlus, FiLogOut, FiTrash2 } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useFetch } from "../../hooks/useFetch";
import { useAuth } from "../../context/auth-context";
import { logout } from "../../services/auth-service";
import {
  createTodo,
  deleteTodo,
  toggleTodo,
} from "../../services/todo-service";

export const Home = () => {
  const { data, isLoading, error, refetch } = useFetch("/todos");

  useEffect(() => {
    if (error) {
      toast.error(error || "Failed to fetch todos");
    }
  }, [error]);

  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      label: "",
    },
  });

  const user = useAuth();

  const handleAdd = async (data) => {
    await createTodo(data);
    refetch();
    reset();
  };

  const handleComplete = async (todo) => {
    await toggleTodo(todo);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    refetch();
  };

  const handleLogout = async () => {
    logout(navigate);
  };

  return (
    <main className="w-[800px] mx-auto">
      <h1 className="text-center text-4xl font-bold mt-20 mb-10">
        Hello, {user?.name}!
      </h1>
      <form
        className="flex gap-4 items-center mb-10"
        onSubmit={handleSubmit(handleAdd)}
      >
        <Input
          type="text"
          placeholder="Add your todos"
          className="w-full"
          {...register("label")}
        />
        <Button type="submit" className="flex items-center gap-2">
          Add
          <FiPlus />
        </Button>
      </form>

      {isLoading ? (
        <div className="space-y-3">
          <Skeleton height={28} count={5} />
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="pt-20">
          <h2 className="text-center text-2xl font-medium">
            You don't have any todos
          </h2>
        </div>
      ) : (
        <div className="space-y-3">
          {data?.data?.map((todo) => (
            <div key={todo._id} className="flex items-center justify-between">
              <div className="text-lg flex items-center gap-4">
                <input
                  className="cursor-pointer size-4 accent-black"
                  type="checkbox"
                  onChange={() => handleComplete(todo)}
                  checked={todo.isComplete}
                />
                <span className={`${todo.isComplete ? "line-through" : ""}`}>
                  {todo.label}
                </span>
              </div>
              <button
                className="text-black hover:text-red-600 cursor-pointer"
                onClick={() => handleDelete(todo._id)}
              >
                <FiTrash2 size={22} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Button
        className="flex items-center gap-2 absolute bottom-10 right-12"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </Button>
    </main>
  );
};
