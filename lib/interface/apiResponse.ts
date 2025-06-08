interface apiResponse {
  statusCode: number;
  isSuccess: boolean;
  result: any;
  errorMessage: string[];
}

export default apiResponse;