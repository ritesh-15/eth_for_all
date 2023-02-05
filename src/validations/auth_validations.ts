import z from "zod"

// Create account schema
export const CreateAccountSchema = z.object({
  body: z.object({
    phone: z
      .string({
        required_error: "Phone number is required!",
      })
      .length(10),
    email: z
      .string({ required_error: "Email address is required!" })
      .email("Invalid email address please provide a valid email address!"),
  }),
})

export type ICreateAccount = z.infer<typeof CreateAccountSchema>

// Login schema
export const LoginSchema = z.object({
  body: z.object({
    phone: z
      .string({
        required_error: "Phone number is required!",
      })
      .length(10)
      .optional()
      .default(""),
    email: z
      .string({ required_error: "Email address is required!" })
      .email("Invalid email address please provide a valid email address!")
      .optional(),
    password: z
      .string({ required_error: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
})

export type ILogin = z.infer<typeof LoginSchema>

// Send otp schema
export const SendOTPSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email address is required!" }).email(),
  }),
})

export type ISendOTP = z.infer<typeof SendOTPSchema>

// Verify otp schema
export const VerifyOTPSchema = z.object({
  body: z
    .object({
      email: z.string({ required_error: "Email address is required!" }).email(),
      otp: z
        .string({ required_error: "One time password is required!" })
        .length(7),
      hash: z.string({ required_error: "Hash is required!" }),
    })
    .transform((data) => {
      return {
        ...data,
        otp: Number(data.otp),
      }
    }),
})

export type IVerifyOTP = z.infer<typeof VerifyOTPSchema>
