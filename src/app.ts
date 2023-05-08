import "dotenv/config"
import express from "express"
import cors from "cors"
import {} from "@/routes"
import { resolve } from "path"
import "@/config/database"

const app = express()

/**
 * Middlewares
 */
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: "application/vnd.api+json" }))
app.use(
  "/images",
  express.static(resolve(__dirname, "..", "uploads", "images"))
)

/**
 * Routes
 */
app.use("/api")
app.use("/uploads")
app.use("/alunos")
app.use("/turmas")
app.use("/relatorios")
app.use("/professores")

export { app }
