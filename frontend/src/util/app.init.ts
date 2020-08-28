import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const appInit = function () {
  toast.configure({
    autoClose: 8000,
    draggable: false,
    position: "bottom-center",
  });
};
