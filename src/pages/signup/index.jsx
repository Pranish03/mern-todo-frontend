import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button";
import { Input } from "../../components/input";

export const Signup = () => {
  const [formValue, setFormValue] = useState({
    name: "",
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
        <h1 className="text-3xl font-bold text-center mb-2">Signup</h1>
        <h2 className="text-lg font-medium text-center text-black mb-6">
          Create a new account
        </h2>

        <form className="space-y-4 text-gray-800" onSubmit={handleSubmit}>
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
              value={formValue.name}
              onChange={(e) =>
                setFormValue((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                })
              }
            />
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
              placeholder="Enter a password"
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
