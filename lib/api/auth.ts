import {
  registerRequest,
  registerResponse,
} from "../interface/apiRegisterInterface";
import apiResponse from "../interface/apiResponse";
import { failedApiDefaultResponse } from "../SD";
import axiosInstance from "./axiosInstance";

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<apiResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    return error?.response?.data || failedApiDefaultResponse;
  }
};

export const registerUser = async (
  data: registerRequest
): Promise<apiResponse> => {
  try {
    const response = await axiosInstance.post("/Auth/register", data);
    return response.data;
  } catch (error: any) {
    return error?.response?.data || failedApiDefaultResponse;
  }
};
