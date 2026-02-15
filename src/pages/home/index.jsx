import { FiPlus, FiLogOut, FiTrash2 } from "react-icons/fi";
import { useFetch } from "../../hooks/useFetch";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { axios } from "../../lib/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      label: "",
    },
  });

  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useFetch("/todos");

  const onSubmit = async (data) => {
    try {
      await axios.post("/todos", data);
      refetch();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComplete = async (todo) => {
    try {
      await axios.patch(`/todos/${todo?._id}`, {
        isComplete: !todo?.isComplete,
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");

    delete axios.defaults.headers.common["Authorization"];
    await refetch();
    navigate("/login");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error || "Error occurred"}</p>;
  }

  return (
    <main className="w-[800px] mx-auto">
      <h1 className="text-center text-4xl font-bold mt-20 mb-10">
        Hello, Pranish!
      </h1>
      <form
        className="flex gap-4 items-center mb-10"
        onSubmit={handleSubmit(onSubmit)}
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

      {data?.data?.length === 0 ? (
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
