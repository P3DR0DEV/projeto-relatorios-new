import "dotenv/config"
import { generateToken } from "@/config"
import { Request, Response } from "express"
import { AuthenticationOptions, authenticate } from "ldap-authentication"
interface RequestBodyAuth {
  user: string
  pass: string
}

const domain = process.env.DOMAIN
const permissions = [{ username: "150367" }, { username: "150176" }]

export const userAuthenticate = async (req: Request, res: Response) => {
  try {
    const { user, pass }: RequestBodyAuth = req.body
    if (!user || !pass) {
      return res.status(400).json({
        error: "You need to provide User and Password on the body Request!",
      })
    }
    const validUser = permissions.some(
      (allowedUser) => allowedUser.username === user
    )
    if (!validUser) {
      return res.status(403).json({
        error: "You don't have permission to access this page.",
      })
    }

    const options: AuthenticationOptions = {
      ldapOpts: {
        url: process.env.LDAP_URL,
      },
      userDn: `${user}@${domain}`,
      userPassword: pass,
      userSearchBase: process.env.DOMAIN_CONTROLLER,
    }

    const authUser: boolean = await authenticate(options)
    if (!authUser) {
      return res.json({
        message: "Connection Error",
      })
    }
    const token = generateToken(user, authUser)
    return res.json({ token })
  } catch (e) {
    console.log(e) // eslint-disable-line
  }
}
