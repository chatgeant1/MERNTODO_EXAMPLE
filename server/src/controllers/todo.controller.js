////////////////////////////////////////
// 4) Logic Controllers & test API (Thunder Client/Postman)
////////////////////////////////////////

import todoModel from "../models/todo.model.js";

export const list = async (req, res) => {
    const {status, from, to, page=1, limit=10} = req.query

    const q = {}

    if(status === "true" || status === "false")
        q.completed = status === "true"

    if(from || to){
        q.createdAt = {}
        if(from)    q.createdAt.$gte = new Date(from)
        if(to)      q.createdAt.$lte = new Date(to)
    }

    const skip = (Number(page) - 1) * Number(limit)

    const [items, total] = await Promise.all([
        todoModel.find(q).sort({createdAt: -1}).skip(skip).limit(Number(limit)),
        todoModel.countDocuments(q)
    ])

    res.json({
        items,
        total,
        page: Number(page),
        pages: Math.ceil(total/Number(limit))
    })
}

export const create = async (req, res) => {
    const {title, dueAt} = req.body
    const todo = await todoModel.create({title, dueAt})
    res.status(201).json(todo)
}

export const update = async (req, res) => {
    const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(todo)
}

export const stats = async (req, res) => {
    const [byStatus, byDay] = await Promise.all([
        todoModel.aggregate([
            {
                $group: {
                    _id: "$completed", 
                    count: {$sum: 1}
                }
            }
        ]),
        todoModel.aggregate([
            {
                $group:{
                    _id: {$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
                    count: {$sum: 1}

                }
            },
            {$sort: {_id: 1}}
        ])
    ])
    res.json({ byStatus, byDay})
}


// Test nhanh (Thunder Client)
// • POST /api/todos body: { "title": "Learn MERN", "dueAt": "2025-09-30" }
// • GET /api/todos?status=false&page=1&limit=5
// • GET /api/todos/stats