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

// get movie shows
export const GetMovieShows = z.object({
  params: z.object({
    movieId: z.string({ required_error: "Movie id is required" }),
  }),
})

export type IGetMovieShows = z.infer<typeof GetMovieShows>

// delete show
export const DeleteShowSchema = z.object({
  params: z.object({
    showId: z.string({ required_error: "show id is required" }),
  }),
})

export type IDeleteShowSchema = z.infer<typeof DeleteShowSchema>

// delete show
export const UpdateShowSchema = z.object({
  params: z.object({
    showId: z.string({ required_error: "show id is required" }),
  }),
  body: z.object({
    startTime: z
      .string({
        invalid_type_error: "start time must be valid",
      })
      .datetime()
      .optional(),
    endTime: z
      .string({
        invalid_type_error: "End time must be valid",
      })
      .datetime()
      .optional(),
  }),
})

export type IUpdateShowSchema = z.infer<typeof UpdateShowSchema>
