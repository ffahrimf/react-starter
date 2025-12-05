import { z } from "zod";

export const LoginSchema = z.object({
  key: z.string().min(1, "Username atau Email wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type TLoginSchema = z.infer<typeof LoginSchema>;
