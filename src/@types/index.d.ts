import UserDTO from "../dtos/UserDTO"

export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string
      }
    }
  }
}
