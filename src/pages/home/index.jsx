import { FiPlus, FiLogOut, FiTrash2 } from "react-icons/fi";
import { useFetch } from "../../hooks/useFetch";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { axios } from "../../lib/axios";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";

export const Home = () => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      label: "",
    },
  });

  const navigate = useNavigate();

  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useFetch("/auth/me");

  const {
    data: todoData,
    isLoading: isTodoLoading,
    error: todoError,
    refetch,
  } = useFetch("/todos");

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

  if (isUserLoading || isTodoLoading) {
    return <p>Loading...</p>;
  }

  // if (!userData?.data?.user) {
  //   return <Navigate to="/login" replace={true} />;
  // }

  if (userError || todoError) {
    return <p>{userError || todoError || "Error occurred"}</p>;
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

      {todoData?.data?.length === 0 ? (
        <div className="pt-20">
          <h2 className="text-center text-2xl font-medium">
            You don't have any todos
          </h2>
        </div>
      ) : (
        <div className="space-y-3">
          {todoData?.data?.map((todo) => (
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
