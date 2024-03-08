export interface GoogleUser {
  googleEmail: string;
  googleSub: string;
  name: string | null;
}
export interface UpdateUser {
  email: string | null | undefined;
  phone: string | null | undefined;
  name: string | null | undefined;
  password: string | null | undefined;
}
export interface User {
  userId: number;
  email: string;
  name: string;
  phone: string;
  subscriptionId: number;
  subscriptionExpireDate: string;
}
export interface SessionUser {
  token: string;
  user: User;
}
