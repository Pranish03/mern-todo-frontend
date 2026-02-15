import { PulseLoader } from "react-spinners";

export const PageLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <PulseLoader color="#000000" />
    </div>
  );
};
