import z from "zod"

// Create account schema
export const CreateAccountSchema = z.object({
  phone: z
    .string({
      required_error: "Phone number is required!",
    })
    .length(10),
  email: z.string({ required_error: "Email address is required!" }).email(),
})

export type ICreateAccount = z.infer<typeof CreateAccountSchema>

// Login schema
export const LoginSchema = z.object({
  phone: z
    .string({
      required_error: "Phone number is required!",
    })
    .length(10)
    .optional(),
  email: z
    .string({ required_error: "Email address is required!" })
    .email()
    .optional(),
  password: z
    .string({ required_error: "Password is required!" })
    .min(6, { message: "Password must be at least 6 characters" }),
})

export type ILogin = z.infer<typeof LoginSchema>

// Send otp schema
export const SendOTPSchema = z.object({
  email: z.string({ required_error: "Email address is required!" }).email(),
})

export type ISendOTP = z.infer<typeof SendOTPSchema>

// Verify otp schema
export const VerifyOTPSchema = z.object({
  email: z.string({ required_error: "Email address is required!" }).email(),
  otp: z.string({ required_error: "One time password is required!" }).length(6),
  hash: z.string({ required_error: "Hash is required!" }),
})

export type IVerifyOTP = z.infer<typeof VerifyOTPSchema>
