const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:["true" , "task name is required"],
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        enum:["Opened" , "Assigned" , "Completed"],
        default:"Opened"
    },
    label:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Label",
        required:true
    },
    description:{
        type:String,
        required:true,
    }
} , {timestamps:true})

const Task = mongoose.model("Task" , taskSchema);
module.exports = Task; 