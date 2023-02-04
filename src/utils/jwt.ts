import jwt from "jsonwebtoken"
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../keys"

export default interface IJWT extends jwt.JwtPayload {
  id: string
}

export function signTokens(userId: string) {
  const accessToken = jwt.sign(
    {
      id: userId,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  )

  const refreshToken = jwt.sign(
    {
      id: userId,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  )

  return { accessToken, refreshToken }
}

export function verifyAccessToken(accessToken: string) {
  return <IJWT>jwt.verify(accessToken, ACCESS_TOKEN_SECRET)
}

export function verifyRefreshToken(refreshToken: string) {
  return <IJWT>jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
}
