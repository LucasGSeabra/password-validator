export interface ValidatePasswordRequest {
  password: string;
}

export interface ValidatePasswordResponse {
  isValid: boolean;
  messages?: string[];
}
