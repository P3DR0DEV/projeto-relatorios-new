import { config } from "dotenv"
config()

export const url = process.env.APP_HOST as string
