import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().trim().min(8, "Password must have atleast 8 characters"),
});

export const signupSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().trim().min(8, "Password must have atleast 8 characters"),
});
