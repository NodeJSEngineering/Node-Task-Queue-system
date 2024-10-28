const mongoose = require("mongoose");
const labelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    }
} , {timestamps:true})

const Label = mongoose.model("Label" , labelSchema);
module.exports = Label;