const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    task:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task",
        required:true
    },
    requestedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    description:{
        type:String,
        required:true
    }
} , {timestamps:true})
const RequestTask = mongoose.model("RequestTask" , requestSchema);
module.exports = RequestTask;