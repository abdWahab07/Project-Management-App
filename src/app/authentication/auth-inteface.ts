export interface AuthResponse {
  token: string;
  employeeId: Number;
}

export interface LoginResponse {
  userId: any;
  token: string;
  employeeId: Number;
}

export interface RegisterResponse {
  employeeId: Number;
  message: string;
}
