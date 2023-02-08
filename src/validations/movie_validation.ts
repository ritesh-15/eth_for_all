import z from "zod"

// add movie schema
export const AddMovieSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Movie name not provided" }),
    description: z.string({ required_error: "Movie description not provided" }),
    language: z.string({ required_error: "Movie language not provided" }),
    genere: z.string({ required_error: "Movie genere not provided" }),
    realeaseDate: z.string({
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
