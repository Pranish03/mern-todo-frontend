import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Todo } from "../../components/todo";

export const Home = () => {
  const [todo, setTodo] = useState("");

  const onClick = () => {
    console.log(todo);
  };

  return (
    <main className="w-[800px] mx-auto">
      <h1 className="text-center text-4xl font-bold mt-20 mb-10">
        Hello, Pranish!
      </h1>
      <div className="flex gap-4 items-center mb-10">
        <Input
          type="text"
          placeholder="Add your todos"
          className="w-full"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <Button className="flex items-center gap-2" onClick={onClick}>
          Add
          <FiPlus />
        </Button>
      </div>
      <div className="space-y-3">
        <Todo />
        <Todo />
      </div>
    </main>
  );
};
