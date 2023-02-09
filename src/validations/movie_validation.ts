import z from "zod"

// add movie schema
export const AddMovieSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Movie name not provided" }),
    description: z.string({ required_error: "Movie description not provided" }),
    language: z.string({ required_error: "Movie language not provided" }),
    genere: z.string({ required_error: "Movie genere not provided" }),
    posterURL: z.string({ required_error: "Poster URL not provided" }),
    releaseDate: z.string({
      required_error: "Movie release date not provided",
      invalid_type_error: "Release date should be in valid formate",
    }),
    duration: z.string({
      required_error: "Movie duration not provided",
      invalid_type_error: "Duration should be in valid formate",
    }),
  }),
})

export type IAddMovieSchema = z.infer<typeof AddMovieSchema>

// get all movies
export const GetAllMoviesSchema = z.object({
  query: z.object({
    name: z.string().optional(),
  }),
})

export type IGetAllMoviesSchema = z.infer<typeof GetAllMoviesSchema>

// update movie schema
export const UpdateMovieSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    language: z.string().optional(),
    genere: z.string().optional(),
    posterURL: z.string().optional(),
    releaseDate: z
      .string({
        invalid_type_error: "Release date should be in valid formate",
      })
      .optional(),
    duration: z
      .string({
        invalid_type_error: "Duration should be in valid formate",
      })
      .optional(),
  }),
  params: z.object({
    id: z
      .string({ required_error: "Movie id is required!" })
      .uuid("Movie id must be valid"),
  }),
})

export type IUpdateMovieSchema = z.infer<typeof UpdateMovieSchema>
