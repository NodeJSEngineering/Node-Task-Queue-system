const ApiError = require("../utils/apiError");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const Token = (user)=>{
    try {
        return jwt.sign({ id: user._id, name: user.name }, process.env.TOKEN_SECRET, { expiresIn: "3d" });
    } catch (error) {
        throw new ApiError(500 , "token is not creating");
    }
}
exports.register = asyncHandler(async (req,res)=>{
    const {name , email , password , role} = req.body;
    if(!(name && email && password && role)){
        throw new ApiError(400 , "all fields are required");
    }
    const existUser = await User.findOne({$or:[{email} , {name}]});
    if(existUser){
        throw new ApiError(400 , "user already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        role
    })
    if(!user){
        throw new ApiError(500 , "user is not created");
    }
    if(user){
        user.password = undefined
        
    }
    const accessToken = Token(user);
    // console.log("the access token: " , accessToken);
    const options = {
        httpOnly:true,
        secure:true
    }
    return res.status(201).cookie("accessToken" , accessToken , options).json(
        new ApiResponse("user is created" , {user:user , accessToken} , 200)
    )
})

exports.login = asyncHandler(async(req,res)=>{
    const {email , password} = req.body
    if(!(email && password)){
        throw new ApiError(400 , "all fields are required");
    }
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(404 , "user is not found");
    }
    const ispasswordvalid = await user.ispasswordcorrect(password);
    if(!ispasswordvalid){
        throw new ApiError(400,"password is incorrect");
    }
    user.password = undefined;
    const options = {
        httpOnly:true,
        secure:true
    }
    const accessToken = Token(user);
    return res.status(200).cookie("accessToken" , accessToken , options).json(
        new ApiResponse("user is logedIn" , {user:user , accessToken} , 200)
    )
})

//findbyId
exports.getUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        throw new ApiError(404 , "user not found");
    }
    user.password = undefined;
    return res.status(200).json(
        new ApiResponse("user is created" , user)
    )
})

//getAllUsers
exports.getAllUsers = asyncHandler(async (req,res)=>{
    const users = await User.find();
    if(!users){
        throw new ApiError(404 , "users are not found");
    }
    return res.status(200).json(
        new ApiResponse("users are" , users)
    )
})

//update user
exports.updateUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        throw new ApiError(404 , "user not found");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.userId , req.body , {new:true , runValidators:true});
    if(!updatedUser){
        throw new ApiError(500 , "user is not updated");
    }
    return res.status(200).json(
        new ApiResponse("updated user is" , updatedUser)
    )
})

//deleteUser 
exports.deleteUser = asyncHandler(async (req,res)=>{
    const user = await User.findById(req.params.userId);
    if(!user){
        throw new ApiError(404 , "user not found");
    }
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if(!deletedUser){
        throw new ApiError(400 , "user is not deleted");
    }
    return res.status(204).json(
        new ApiResponse("user is deleted")
    )
})

//logoutUser
exports.logout = asyncHandler(async (req , res)=>{
    const options = {
        httpOnly:true,
        secure:true
    }
    return res.status(200).clearCookie("accessToken" , options).json(
        new ApiResponse("user logout succefully! " , null , 200)
    )
})