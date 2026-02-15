import axios from "axios";
import { toast } from "sonner";

export const logout = async (navigate) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  toast.success("Logged out successfully");
  navigate("/login");
};
