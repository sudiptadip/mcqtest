import { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { apiResponse } from "../interface";
import { failedApiDefaultResponse } from "../SD";
import { EndpointType } from "../SD";

const apiCallPostRequest = async <T = any>(
  endpoint: EndpointType,
  mode: number,
  body?: T
): Promise<apiResponse> => {
  try {
    const response = await axiosInstance.post(
      `/AuthStoredProcedure/execute/${endpoint}/${mode}`,
      body || {}
    );
    return response.data;
  } catch (error) {
    const err = error as AxiosError<apiResponse>;
    return err?.response?.data || failedApiDefaultResponse;
  }
};

export default apiCallPostRequest;
