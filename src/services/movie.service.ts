import { Movie } from "@prisma/client"
import Prisma from "../helper/prisma_client"
import Redis from "../helper/redis_client"
import {
  IAddMovieSchema,
  IUpdateMovieSchema,
} from "../validations/movie_validation"

class MovieService {
  static KEY = "MOVIES"

  // redis

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

  static setMovie(movie: Movie) {
    return Redis.get().set(`${this.KEY}-${movie.id}`, JSON.stringify(movie))
  }

  static delMovie(id: string) {
    return Redis.get().del(`${this.KEY}-${id}`)
  }

  static async getMovie(id: string): Promise<Movie | null> {
    const movies = await Redis.get().get(`${this.KEY}-${id}`)
    return movies ? JSON.parse(movies) : null
  }

  // database

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

  static findByID(id: string) {
    return Prisma.get().movie.findUnique({
      where: {
        id,
      },
    })
  }

  static deleteByID(id: string) {
    return Prisma.get().movie.delete({
      where: {
        id,
      },
    })
  }
}

export default MovieService
