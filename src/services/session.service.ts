import Prisma from "../helper/prisma_client"

export interface ICreateSession {
  token: string
  userId: string
}

class SessionService {
  static create(data: ICreateSession) {
    return Prisma.get().session.create({
      data,
    })
  }

  static deleteByID(id: string) {
    return Prisma.get().session.delete({
      where: { id },
    })
  }

  static deleteManyByUserID(userId: string) {
    return Prisma.get().session.deleteMany({
      where: { userId },
    })
  }

  static findByToken(token: string) {
    return Prisma.get().session.findUnique({
      where: {
        token,
      },
    })
  }
}

export default SessionService
