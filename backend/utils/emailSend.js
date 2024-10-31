const nodemailer = require("nodemailer");
exports.requestAssignMail = async(userEmail , taskName)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })
    const emailOptions = {
        from:"task queue system",
        to:userEmail,
        subject:"A new User Request for Assign of Task",
        text:`Hello,
        
        This message is to inform you of a new task assignment request. The task titled "${taskName}" has been requested by a user. Please visit the official app to review the description and assign the task.`
    }
    try {
        const requestMail = await transport.sendMail(emailOptions);
        // console.log("Mail sent successfully:", requestMail);
        return requestMail
    } catch (error) {
        console.log("error for sending a mail! " , error);
    }
}


//Accept or Reject actions

exports.acceptRejectMail = async(userEmail , taskName , status = false)=>{
    const transport = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    })
    const emailText = status === true ? ` Hello, 
    We are pleased to inform you that your task request for "${taskName}" has been accepted. Please check the official app for further details.` : `Hello
    This message is to inform you that your task request for "${taskName}" has been rejected. Please check the official app for more information.`
    const emailOptions = {
        from:"task queue system",
        to:userEmail,
        subject:"A new User Request for Assign of Task",
        text:emailText
    }
    try {
        const requestMail = await transport.sendMail(emailOptions);
        // console.log("Mail sent successfully:", requestMail);
        return requestMail
    } catch (error) {
        console.log("error for sending a mail! " , error);
    }
}