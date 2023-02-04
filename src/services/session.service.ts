import Prisma from "../helper/prisma_client"

export interface ICreateSession {
  token: string
  userId: string
}

class SessionService {
  create(data: ICreateSession) {
    return Prisma.get().session.create({
      data,
    })
  }
}

export default SessionService
