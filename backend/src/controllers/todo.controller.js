import todo from "../models/todo.js";

const addTodo = async(req,res)=>{
    try {
        const{title,description}=req.body;
        if (!title || !description) {
            return res.status(500).json({message:"tilte and description not found"})
        }
        const newTodo = new todo({title,description})
        await newTodo.save();
        return res.status(200).json({message:"todo saved successfully",newTodo})

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

const getTodo = async(req,res)=>{
    const todos= await todo.find()
    return res.status(200).json({message:"todo found successfully", todos})
}

const updateTodo = async(req,res)=>{
    const id = req.params.id
    const updateTodo= await todo.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({message:"todo updated successfully",updateTodo})
}


const deleteTodo=async(req,res)=>{
    await todo.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"todo deleted successfully"})
}

export {addTodo,getTodo,updateTodo,deleteTodo};