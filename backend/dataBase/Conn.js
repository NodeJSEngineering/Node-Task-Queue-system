const mongoose = require("mongoose");
const ConnectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db is connected successfully !:");
    } catch (error) {
        console.log("the error for connecting Db: " , error);
        process.exit(1);
    }
}
module.exports = ConnectDB;