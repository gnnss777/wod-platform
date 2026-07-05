"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { createId } from "@paralleldrive/cuid2";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { createSession, deleteSession } from "@/lib/session";
import { SignupFormSchema, LoginFormSchema, FormState } from "@/lib/definitions";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, password, role } = validatedFields.data;

  const { data: existing } = await supabaseAdmin.from("User").select("id").eq("email", email).single();
  if (existing) {
    return { message: "Este email já está cadastrado" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const now = new Date().toISOString();
  const { data: user, error } = await supabaseAdmin.from("User").insert({
    id: createId(),
    name,
    email,
    password: hashedPassword,
    role,
    createdAt: now,
    updatedAt: now,
  }).select().single();

  if (error || !user) {
    return { message: `Erro ao criar conta: ${error?.message || "Desconhecido"}` };
  }

  await createSession(user.id, user.role);
  redirect(user.role === "MESTRE" || user.role === "NARRADOR" ? "/narrador" : "/jogador");
}

export async function login(state: FormState, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const { data: user } = await supabaseAdmin.from("User").select("*").eq("email", email).single();

  if (!user) {
    return { message: "Email ou senha inválidos" };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { message: "Email ou senha inválidos" };
  }

  await createSession(user.id, user.role);
  redirect(user.role === "MESTRE" || user.role === "NARRADOR" ? "/narrador" : "/jogador");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
