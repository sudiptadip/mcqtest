interface registerRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

interface registerResponse {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  token: string;
}

export type { registerRequest, registerResponse };
