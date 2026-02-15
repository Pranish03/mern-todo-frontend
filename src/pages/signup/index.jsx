import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { axios } from "../../lib/axios";
import { signupSchema } from "../../schema/authSchema";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { toast } from "sonner";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");

      const res = await axios.post("/auth/signup", data);
      localStorage.setItem("token", res.data?.data?.token);

      reset();
      toast.success("Welcome to todo app");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 409) {
        setServerError("Email is already taken");
      } else {
        toast.error("Something went wrong. Try again");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[430px]">
        <h1 className="text-3xl font-bold text-center mb-2">Signup</h1>
        <h2 className="text-lg font-medium text-center text-black mb-6">
          Create a new account
        </h2>

        <form
          className="space-y-4 text-gray-800"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="block max-w-fit text-sm text-gray-800 sm:text-base font-medium mb-2"
            >
              Name*
            </label>
            <Input
              className="w-full"
              type="text"
              id="name"
              placeholder="Enter a name"
              {...register("name")}
              errors={errors.name}
            />
            {errors.name && (
              <p className="text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block max-w-fit text-sm text-gray-800 sm:text-base font-medium mb-2"
            >
              Email*
            </label>
            <Input
              className="w-full"
              type="email"
              id="email"
              placeholder="Enter an email"
              {...register("email")}
              errors={errors.email}
            />
            {errors.email && (
              <p className="text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block max-w-fit text-sm text-gray-800 sm:text-base font-medium mb-2"
            >
              Password*
            </label>
            <Input
              className="w-full"
              type="password"
              id="password"
              placeholder="Enter a password"
              {...register("password")}
              errors={errors.password}
            />
            {errors.password && (
              <p className="text-red-600 mt-1">{errors.password.message}</p>
            )}
          </div>

          {serverError && <p className="text-red-600 mt-1">{serverError}</p>}

          <Button type="submit" className="w-full mt-1">
            Signup
          </Button>
        </form>

        <div className="mt-4 text-center text-base">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
