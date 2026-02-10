export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface User{
  id: number;
  username: string;
  name: string;
  lastName: string;
  sex: string;
  dni: string;
  createdAt: Date;
  updatedAt: Date;
}