import toastNotify from "./toastNotify";

export default function rtkErrorRead(error: string[]) {
  toastNotify(error.join(","), "error");
}
