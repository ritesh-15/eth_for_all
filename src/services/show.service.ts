import Prisma from "../helper/prisma_client"
import { INewShowSchema } from "../validations/show_validation"

class ShowService {
  static create(data: INewShowSchema["body"]) {
    return Prisma.get().show.create({ data })
  }
}

export default ShowService
