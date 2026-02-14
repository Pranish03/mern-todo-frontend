import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";

export const Todo = () => {
  const [isComplete, setIsComplete] = useState(false);

  const onChange = () => {
    setIsComplete((prev) => !prev);
  };

  const onClick = () => {
    console.log("Delete");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-lg flex items-center gap-4">
        <input
          className="cursor-pointer size-4 accent-black"
          type="checkbox"
          checked={isComplete}
          onChange={onChange}
        />
        <span className={`${isComplete ? "line-through" : ""}`}>
          Finish Mern course
        </span>
      </div>
      <button
        className="text-black hover:text-red-600 cursor-pointer"
        onClick={onClick}
      >
        <FiTrash2 size={22} />
      </button>
    </div>
  );
};
