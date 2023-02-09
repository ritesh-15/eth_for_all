import { Movie } from "@prisma/client"
import Prisma from "../helper/prisma_client"
import Redis from "../helper/redis_client"
import {
  IAddMovieSchema,
  IUpdateMovieSchema,
} from "../validations/movie_validation"

class MovieService {
  static KEY = "MOVIES"

  static setMovies(movies: Movie[]) {
    return Redis.get().set(`${this.KEY}`, JSON.stringify(movies))
  }

  static delMovies() {
    return Redis.get().del(this.KEY)
  }

  static async getMovies(): Promise<Movie[] | null> {
    const movies = await Redis.get().get(`${this.KEY}`)
    return movies ? JSON.parse(movies) : null
  }

  static create(data: IAddMovieSchema["body"]) {
    return Prisma.get().movie.create({
      data,
    })
  }

  static updateMovie(id: string, data: IUpdateMovieSchema["body"]) {
    return Prisma.get().movie.update({
      where: {
        id,
      },
      data,
    })
  }

  static findAll(name?: string) {
    return Prisma.get().movie.findMany({
      where: {
        name: name && {
          contains: name,
        },
      },
    })
  }
}

export default MovieService
