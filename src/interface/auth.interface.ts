import type { TLoginSchema } from "../lib/validators";

export interface RoleIF {
  id: number;
  name: string;
}

export interface AuthState {
  token: string | null;
  role: string | null;
  guid: string | null;
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
