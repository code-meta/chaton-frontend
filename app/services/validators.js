import * as z from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .min(2, "username is too short.")
    .max(30, "username is too large."),
  email: z.string().email("invalid email address."),
  password: z
    .string()
    .min(6, "password is too short.")
    .max(64, "password is too big.")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,64}$/,
      "mix it up a bit! use more types of characters."
    ),
});

export const loginSchema = z.object({
  email: z.string().email("invalid email address."),
  password: z.string(),
  // .min(6, "password is too short.")
  // .max(64, "password is too big."),
});
