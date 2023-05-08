import "dotenv/config"
import fs from "fs"
import https, { ServerOptions } from "https"
import { app } from "@/app"

const httpsConfigOptions: ServerOptions = {
  key: fs.readFileSync(process.env.PATH_KEY_SSH as string),
  cert: fs.readFileSync(process.env.PATH_CERT_SSH as string),
}

https
  .createServer(httpsConfigOptions, app)
  .listen(process.env.PORT as string, () => {
    console.log(`Running on ${process.env.PORT}...`) //eslint-disable-line
  })
