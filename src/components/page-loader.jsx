import { ClipLoader } from "react-spinners";

export const PageLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <ClipLoader color="#000000" />
    </div>
  );
};
