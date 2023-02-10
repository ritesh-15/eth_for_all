import Prisma from "../helper/prisma_client"
import { IAddCinemaHallSchema } from "../validations/cinema_hall_validation"

class CinemaHallService {
  static create(data: IAddCinemaHallSchema["body"]) {
    // return Prisma.get().cinemaHall.create({ data })
  }
}

export default CinemaHallService
