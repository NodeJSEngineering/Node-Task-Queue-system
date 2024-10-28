const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const Task = require("../models/task.model");

//create new Task
exports.newTask = asyncHandler(async(req,res)=>{
    const {name , user , description , label} = req.body;
    if(!(name && user && description && label)){
        throw new ApiError(400 , "Task name is required");
    }
    const existTask = await Task.findOne({$and:[{name} , {user}]});
    if(existTask){
        throw new ApiError(400 , "Task already exist");
    }
    const task = await Task.create({
        name,
        user,
        description,
        label
    })
    if(!task){
        throw new ApiError(500 , "task is not created");
    }
    return res.status(201).json(
        new ApiResponse("Task is created" , task , 201)
    )
})

//get all Task
exports.getAllTask = asyncHandler(async(req,res)=>{
    const task = await Task.find();
    if(task.length === 0){
        throw new ApiError(404 , "tasks are not found")
    }
    return res.status(200).json(
        new ApiResponse("tasks are " , task , 200)
    )
})

//get Task
exports.getTask = asyncHandler(async(req,res)=>{
    const task = await Task.findById(req.params.taskId);
    if(!task){
        throw new ApiError(404 , "task is not found");
    }
    return res.status(200).json(
        new ApiResponse("task is" , task , 200)
    )
})

//update Task
exports.updateTask = asyncHandler(async(req,res)=>{
    const task = await Task.findByIdAndUpdate(req.params.taskId);
    if(!task){
        throw new ApiError(404 , "task is not found");
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId , req.body , {new:true , runValidators:true});
    if(!updatedTask){
        throw new ApiError(500 , "task is not updated");
    }
    return res.status(200).json(
        new ApiResponse("updatedTask is " , updatedTask , 200)
    )
})

//delete Task
exports.deleteTask = asyncHandler(async()=>{
    const task = await Task.findById(req.params.taskId);
    if(!task){
        throw new ApiError(404 , "task is not found");
    }
    const deleteTask = await Task.findByIdAndDelete(req.params.taskId);
    if(!deleteTask){
        throw new ApiError(500 , "Task is not deleted");
    }
    return res.status(204).json()
})