////////////////////////////////////////
// 2) Creating Routes
////////////////////////////////////////


import { Router } from "express";
import * as ctl from "../controllers/todo.controller.js"

const r = Router()
r.get("/", ctl.list)
r.get("/stats", ctl.stats)

r.post("/", ctl.create)

r.put("/:id", ctl.update)

// r.delete("/:id", ctl.remove)

export default r