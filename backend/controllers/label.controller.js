const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/apiResponse");
const ApiError = require("../utils/apiError");
const Label = require("../models/label.model");

//create new Label
exports.newLabel = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    if(!name){
        throw new ApiError(400 , "label name is required");
    }
    const existlabel = await Label.findOne({name});
    if(existlabel){
        throw new ApiError(400 , "Label already exist");
    }
    const label = await Label.create({
        name
    })
    if(!label){
        throw new ApiError(500 , "label is not created");
    }
    return res.status(201).json(
        new ApiResponse("Label s=is created" , label , 201)
    )
})

//get all Label
exports.getAllLabel = asyncHandler(async(req,res)=>{
    const label = await Label.find();
    if(label.length === 0){
        throw new ApiError(404 , "labels are not found")
    }
    return res.status(200).json(
        new ApiResponse("labels are " , label , 200)
    )
})

//get Label
exports.getLabel = asyncHandler(async(req,res)=>{
    const label = await Label.findById(req.params.labelId);
    if(!label){
        throw new ApiError(404 , "label is not found");
    }
    return res.status(200).json(
        new ApiResponse("label is" , label , 200)
    )
})

//update Label
exports.updateLabel = asyncHandler(async(req,res)=>{
    const label = await Label.findByIdAndUpdate(req.params.labelId);
    if(!label){
        throw new ApiError(404 , "label is not found");
    }
    const updatedLabel = await Label.findByIdAndUpdate(req.params.labelId , req.body , {new:true , runValidators:true});
    if(!updatedLabel){
        throw new ApiError(500 , "Label is not updated");
    }
    return res.status(200).json(
        new ApiResponse("updatedLabel is " , updatedLabel , 200)
    )
})

//delete Label
exports.deleteLabel = asyncHandler(async()=>{
    const label = await Label.findById(req.params.labelId);
    if(!label){
        throw new ApiError(404 , "label is not found");
    }
    const deleteLabel = await Label.findByIdAndDelete(req.params.labelId);
    if(!deleteLabel){
        throw new ApiError(500 , "Label is not deleted");
    }
    return res.status(204).json()
})