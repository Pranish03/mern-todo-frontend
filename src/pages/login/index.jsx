import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

export const Login = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValue);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[430px]">
        <h1 className="text-3xl font-bold text-center mb-2">Login</h1>
        <h2 className="text-lg font-medium text-center text-black mb-6">
          Get access to your account
        </h2>

        <form className="space-y-4 text-gray-800" onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
              value={formValue.email}
              onChange={(e) =>
                setFormValue((prev) => {
                  return {
                    ...prev,
                    email: e.target.value,
                  };
                })
              }
            />
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
              placeholder="Enter your password"
              value={formValue.password}
              onChange={(e) =>
                setFormValue((prev) => {
                  return {
                    ...prev,
                    password: e.target.value,
                  };
                })
              }
            />
          </div>

          <Button type="submit" className="w-full mt-2">
            Login
          </Button>
        </form>

        <div className="mt-4 text-center text-base">
          Don't have an account?{" "}
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};
