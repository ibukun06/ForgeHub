import { z } from "zod";

/**
 * Password policy per Part 4 (Security): min 8 chars, 1 number, 1 special
 * character. Supabase Auth doesn't enforce this itself, so it's checked
 * here — the one schema imported by both the client form and the server
 * action, per Document 5 §1 ("never trust client-side validation alone").
 */
export const passwordSchema = z
  .string()
  .min(8, "Must be at least 8 characters")
  .regex(/[0-9]/, "Must include a number")
  .regex(/[^A-Za-z0-9]/, "Must include a special character");

export const signUpSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const onboardingSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  institution: z.string().max(150).optional(),
  bio: z.string().max(500).optional(),
  skills: z.array(z.string()).max(20).optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type OnboardingInput = z.infer<typeof onboardingSchema>;
