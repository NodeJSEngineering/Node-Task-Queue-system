const dotenv = require("dotenv");
dotenv.config({path:"./.env"});
const app = require("./app");
const ConnectDB = require("./dataBase/Conn");
ConnectDB()
.then(
    app.listen(process.env.PORT || 3000 , ()=>{
        console.log(`server is connected on port ${process.env.PORT}`);
    })
)
.catch((error)=>{
    console.log("server is not connected: " , error);
})