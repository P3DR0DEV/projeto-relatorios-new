import "dotenv/config"
import { sign } from "jsonwebtoken"

export function generateToken(user: string, isAdmin: boolean) {
  const token = sign({ user, isAdmin }, process.env.SECRET as string, {
    expiresIn: "7d",
  })
  return token
}
