import { config } from "dotenv"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
config()

export function validUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"]
    if (!token) return res.send({ error: "You must be logged in" })
    const bearerToken = token.split(" ")

    if (bearerToken[0] !== "Bearer")
      return res.send({ error: "Invalid type Token" })

    verify(bearerToken[1], process.env.SECRET as string, (e, data) => {
      if (e) return res.send({ e })
      if (!data) return res.send({ error: "Invalid token" })
      else {
        next()
      }
    })
  } catch (error) {
    res.send({ error })
  }
}
