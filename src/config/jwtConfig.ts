import { config } from "dotenv"
import { sign } from "jsonwebtoken"
config()

export function generateToken(user: string, isAdmin: boolean) {
  const token = sign({ user, isAdmin }, process.env.SECRET as string, {
    expiresIn: "7d",
  })
  return token
}
