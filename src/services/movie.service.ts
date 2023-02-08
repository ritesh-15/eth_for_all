import Prisma from "../helper/prisma_client"
import { IAddMovieSchema } from "../validations/movie_validation"

class MovieService {
  static create(data: IAddMovieSchema["body"]) {
    return Prisma.get().movie.create({
      data,
    })
  }
}

export default MovieService
