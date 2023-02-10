import z from "zod"

// add new show schema
export const NewShowSchema = z.object({
  body: z.object({
    startTime: z
      .string({
        invalid_type_error: "start time must be valid",
        required_error: "start tiem is required",
      })
      .datetime(),
    endTime: z
      .string({
        invalid_type_error: "End time must be valid",
        required_error: "End tiem is required",
      })
      .datetime(),
    movieId: z
      .string({ required_error: "Movid id is required" })
      .uuid("Movie id must be valid"),
  }),
})

export type INewShowSchema = z.infer<typeof NewShowSchema>
