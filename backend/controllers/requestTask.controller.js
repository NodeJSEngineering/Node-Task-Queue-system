const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const RequestTask = require("../models/request.model");

//create new RequestTask
exports.newRequestTask = asyncHandler(async(req,res)=>{
    const {description , task , requestedUser} = req.body;
    if(!(description && task && requestedUser)){
        throw new ApiError(400 , "Task name is required");
    }
    const existRequestTask = await RequestTask.findOne({$and:[{requestedUser} , {task}]});
    if(existRequestTask){
        throw new ApiError(400 , "RequestTask already exist");
    }
    const requestTask = await RequestTask.create({
        description, 
        task, 
        requestedUser
    })
    if(!requestTask){
        throw new ApiError(500 , "RequestTask is not created");
    }
    return res.status(201).json(
        new ApiResponse("RequestTask is created" , requestTask , 201)
    )
})

//get all RequestTask
exports.getAllRequestTask = asyncHandler(async(req,res)=>{
    const requestTask = await RequestTask.find();
    if(requestTask.length === 0){
        throw new ApiError(404 , "RequestTasks are not found")
    }
    return res.status(200).json(
        new ApiResponse("RequestTasks are " , requestTask , 200)
    )
})

//get RequestTask
exports.getRequestTask = asyncHandler(async(req,res)=>{
    const requestTask = await RequestTask.findById(req.params.requestTaskId);
    if(!requestTask){
        throw new ApiError(404 , "RequestTask is not found");
    }
    return res.status(200).json(
        new ApiResponse("RequestTask is" , requestTask , 200)
    )
})

//update RequestTask
exports.updateRequestTask = asyncHandler(async(req,res)=>{
    const requestTask = await RequestTask.findByIdAndUpdate(req.params.requestTaskId);
    if(!requestTask){
        throw new ApiError(404 , "RequestTask is not found");
    }
    const updatedRequestTask = await RequestTask.findByIdAndUpdate(req.params.requestTaskId , req.body , {new:true , runValidators:true});
    if(!updatedRequestTask){
        throw new ApiError(500 , "RequestTask is not updated");
    }
    return res.status(200).json(
        new ApiResponse("updatedRequestTask is " , updatedRequestTask , 200)
    )
})

//delete RequestTask
exports.deleteRequestTask = asyncHandler(async(req,res)=>{
    const requestTask = await RequestTask.findById(req.params.requestTaskId);
    if(!requestTask){
        throw new ApiError(404 , "RequestTask is not found");
    }
    const deleteRequestTask = await RequestTask.findByIdAndDelete(req.params.requestTaskId);
    if(!deleteRequestTask){
        throw new ApiError(500 , "RequestTask is not deleted");
    }
    return res.status(204).json()
})