import {
  registerRequest,
} from "../interface/apiRegisterInterface";
import apiResponse from "../interface/apiResponse";
import { failedApiDefaultResponse } from "../SD";
import axiosInstance from "./axiosInstance";
import { AxiosError } from "axios";


export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<apiResponse> => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<apiResponse>;
    return err?.response?.data || failedApiDefaultResponse;
  }
};

export const registerUser = async (
  data: registerRequest
): Promise<apiResponse> => {
  try {
    const response = await axiosInstance.post("/Auth/register", data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<apiResponse>;
    return err?.response?.data || failedApiDefaultResponse;
  }
};
