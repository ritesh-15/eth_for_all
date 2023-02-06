import z from "zod"

// Update schema
export const UpdateSchema = z.object({
  body: z.object({
    phone: z
      .string({
        invalid_type_error: "Phone number should be valid!",
      })
      .length(10)
      .optional(),
    email: z
      .string({ invalid_type_error: "Email address should be valid!" })
      .email("Invalid email address please provide a valid email address!")
      .optional(),
    name: z
      .string({ invalid_type_error: "Name should be a valid string!" })
      .optional(),
    avatar: z
      .string({ invalid_type_error: "Avatar URL should be valid!" })
      .optional(),
  }),
})

export type IUpdateSchema = z.infer<typeof UpdateSchema>

// Update password schema
export const UpdatePasswordSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Password is required!" })
      .min(6, { message: "Password must be at least 6 characters" }),
  }),
})

export type IUpdatePasswordSchema = z.infer<typeof UpdatePasswordSchema>
