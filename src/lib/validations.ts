import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

export const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid Email address." }),
    password: passwordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Invalid Email address." }),
  password: passwordSchema,
});

export const CreateWorkspaceFormSchema = z.object({
  name: z.string(),
  description: z.optional(z.string()),
  type: z.enum(["business", "web-development", "data-science"]),
});

export const CreateBoardFormSchema = z.object({
  colors: z.array(z.string()),
  title: z.string().min(1, { message: "Title is required." }),
  visibility: z.enum(["public", "private"]),
});
