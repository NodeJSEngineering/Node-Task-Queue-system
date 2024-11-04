const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const RequestTask = require("../models/request.model");
const Task = require("../models/task.model");
const {requestAssignMail , acceptRejectMail} = require("../utils/emailSend");

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
    const updateRequest = await Task.findByIdAndUpdate(task , {$push: { requests: requestTask._id }} , { new: true, useFindAndModify: false }).populate("user" , "email");

    if(!updateRequest){
        throw new ApiError(404, "Task not found! ");
    }

    const userEmail = updateRequest.user.email;
    const taskName = updateRequest.name

    const sendMail = await requestAssignMail(userEmail , taskName);
    if(!sendMail){
        throw new ApiError(500 , "mail is not successfully! ");
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

//Accept or Reject requests ! 
exports.acceptRejectRequests = asyncHandler(async(req, res)=>{
    const {requestId , action} = req.body;
    if(!requestId && !action){
        throw new ApiError(400 , "requestId is required! ");
    }
    const request = await RequestTask.findById(requestId).populate("task" , "name").populate("requestedUser" , "email");

    if(!request){
        throw new ApiError(404 , "request is not found");
    }
    const status = action === "accepted" ? true : false;
    const userEmail = request.requestedUser.email;
    const taskName = request.task.name;
    acceptRejectMail(userEmail , taskName , status);

    const updatedTask = await Task.findByIdAndUpdate(request.task._id , {status:"Assigned"} , {new:true});
    if(!updatedTask){
        throw new ApiError(400 , "task is not found! ");
    }

    res.status(200).json(
        new ApiResponse("messages are sent sucessfully! " , null , 200)
    )
})

//get all Request by taskId
exports.getAllRequests = asyncHandler(async(req, res)=>{
    const {taskId} = req.params;
    if(!taskId){
        throw new ApiError(400 , "task Id is not found! ")
    }
    const requests = await RequestTask.find({task:taskId}).populate("requestedUser" , "name").populate("task" , "name");
    if(requests.length === 0){
        return res.status(200).json(
            new ApiResponse("there are no requests for this task! " , null , 200)
        )
    }
    res.status(200).json(
        new ApiResponse("the requets are! " , requests , 200)
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