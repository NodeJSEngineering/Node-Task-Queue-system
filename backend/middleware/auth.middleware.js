const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


exports.AuthMiddleware = async (req,res,next)=>{
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer " , "");
        // console.log("the token from middleware function: " , token);
        // console.log("the token from middleware function-cookies: " , req.cookies?.accessToken);
        if(!token){
            return res.status(401).json({
                status:"fail",
                message:"token is not found"
            })
        }
        const verifyToken = jwt.verify(token , process.env.TOKEN_SECRET);
        const user = await User.findById(verifyToken.id).select("-password");
        if(!user){
            return res.status(404).json({
                status:"fail",
                message:"user is not found"
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}