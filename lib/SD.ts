import apiResponse from "./interface/apiResponse";

export const failedApiDefaultResponse: apiResponse = {
  errorMessage: ["failed to fetch api"],
  isSuccess: false,
  result: null,
  statusCode: 400,
};

export enum ToastType {
  info = "info",
  success = "success",
  warn = "warn",
  error = "error",
  default = "default",
}

export type EndpointType =
  | "SpDropdownCategory"
  | "sp_Exam"
  | "sp_News"
  | "sp_NewsCategory"
  | "sp_Organization"
  | "sp_Tag";
