import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome precisa ter pelo menos 2 caracteres")
    .trim(),
  email: z.string().email("Email inválido").trim(),
  password: z
    .string()
    .min(6, "Senha precisa ter pelo menos 6 caracteres")
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z.string().email("Email inválido").trim(),
  password: z.string().min(1, "Senha é obrigatória"),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
