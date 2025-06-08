import { ToastType } from "@/lib/SD";
import { toast, Bounce } from "react-toastify";

export default function ToastNotify(
  message: string,
  toastType: ToastType = ToastType.success
) {
  const options = {
    position: "top-right" as const,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark" as const,
    transition: Bounce,
  };

  switch (toastType) {
    case ToastType.info:
      return toast.info(message, options);
    case ToastType.success:
      return toast.success(message, options);
    case ToastType.warn:
      return toast.warn(message, options);
    case ToastType.error:
      return toast.error(message, options);
    case ToastType.default:
    default:
      return toast.success(message, options);
  }
}