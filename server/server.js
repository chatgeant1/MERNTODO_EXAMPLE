////////////////////////////////////////
// 1) Bắt đầu tạo APIs (Express server)
////////////////////////////////////////

import express from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import mongoose from "mongoose"
import todoRoutes from "./src/routes/todo.routes.js"

dotenv.config()
const app = express()


app.use(cors({ origin: process.env.CLIENT_URL }))
app.use(express.json())
app.use(morgan("dev"))

mongoose.connect(process.env.MONGO_URI)
    .then( () => console.log("MongoDB connected"))
    .catch(err => console.error("Mongo error: ", err.message))


app.get("/api/health", (_, res) => res.json({ok: true}))
app.use("/api/todos", todoRoutes)

app.listen(process.env.PORT, () => console.log(`API on ${process.env.PORT}`))









