////////////////////////////////////////
// 3) Tạo Model cho Database
////////////////////////////////////////

import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title:      {type: String, required: true, trim: true},
    completed:  {type: Boolean, default: false, index:true},
    dueAt:      {type: Date},
},  
    {timestamps: true}  
)

//??
TodoSchema.index({createdAt: 1})

export default mongoose.model("todoModel", TodoSchema)