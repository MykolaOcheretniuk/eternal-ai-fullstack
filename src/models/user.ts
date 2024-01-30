export interface AuthRequest {
  email: string;
  password: string;
}
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  questions: number;
}
