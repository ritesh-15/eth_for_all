import { config } from "dotenv"

config()

export const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET!!
export const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET!!
export const SEND_GRID_EMAIL: string = process.env.SEND_GRID_EMAIL!!
export const SEND_GRID_API_KEY: string = process.env.SEND_GRID_API_KEY!!
