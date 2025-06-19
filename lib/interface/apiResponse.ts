interface apiResponse {
  statusCode: number;
  isSuccess: boolean;
  result: object;
  errorMessage: string[];
}

export default apiResponse;