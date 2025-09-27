import { useEffect, useState } from "react";
import api from "../services/api.js"

export default function HomePage(){
    const [q, setQ] = useState({
        page:1,
        limit:6,
        status:"",
        from:"",
        to:""
    })

    const [data, setData] = useState({
        items:[],
        total: 0,
        page: 1,
        pages: 1
    })

    const [title, setTitle] = useState("")

    const load = async () => setData(
        (await api.get("/todos", {params:q}))
        .data
        )
    
    useEffect(
        () => {load()}, [q]
    )

    const add = async (e) => {
        e.preventDefault()
        if(!title.trim()) return
        await api.post("/todos", {title})
        setTitle("")
        load()
    }

    const toggle = async (id, completed) => {
        await api.put(`/todos/${id}`, {completed: !completed}) 
        load()
    }

    const remove = async (id) => {
        await api.delete(`/todos/${id}`)
        load()
    }


    return (
        <div className="mx-auto max-w-2xl p-6 space-y-6">
            <form onSubmit={add} className = "flex gap-2">
                <input className="input input-bordered flex-1 px-3 py-2 rounded-lg border"
                    placeholder="New task..." 
                    value = {title} 
                    onChange={e => setTitle(e.target.value)} />
                <button className="px-4 py-2 rounded-lg bg-blue-600 text-white">Add</button>
            </form>

            <div className="flex flex-wrap gap-2 items-end">
                <select className="border rounded px-2 py-1" value = {q.status}
                    onChange={e => setQ(s => ({...s, status:e.target.value}))}>
                        <option value="">All</option>
                        <option value="true">Completed</option>
                        <option value="false">Not Completed</option>
                </select>
                <input type="date" className="border rounded px-2 py-1" onChange={e => setQ(s => ({...s, from:e.target.value}))} />
                <input type="date" className="border rounded px-2 py-1" onChange={e => setQ(s => ({...s, to:e.target.value}))} />
                
            </div>

            <ul className="space-y-2">
                {data.items.map( (t) => (
                    <li key={t._id} className="p-3 border rounded flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" checked={t.completed} onChange={() => toggle(t._id, t.completed)}></input>
                            <span className={t.completed ? "line-through opacity-60":""}>{t.title}</span>
                        </div>
                        <button onClick={()=>remove(t._id)} className="text-red-600">Delete</button>
                    </li>
                ))}
            </ul>

                <div className="flex items-center gap-2">
                    <button disabled={data.page <= 1} onClick={() => setQ( s => ({...s, page:s.page-1}))} className="...">Prev</button>
                    <span>Page {data.page}/{data.pages}</span>
                    <button disabled={data.page >= data.pages} onClick={() => setQ( s => ({...s, page: s.page + 1}))}  className="px-2 py-1 border rounded">Next</button>
                </div>
        </div>
    )
}