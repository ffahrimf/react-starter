import type { TLoginSchema } from "../services/auth/validators";

export interface RoleIF {
  id: number;
  name: string;
}

export interface AuthState {
  token: string | undefined;
  role: string | undefined;
  guid: string | undefined;
  profile: any;
  permissions: any[];
}

export interface UserIF {
  id: number;
  username: string;
  name: string;
  email: string;
  email_verified_at?: number;
  password: string;
  role: RoleIF;
}

export interface LoginResponse {
  token: string;
  refresh_token: string;
  payload: UserIF;
}

export interface ReqIF {
  path: string;
  body: TLoginSchema;
}
