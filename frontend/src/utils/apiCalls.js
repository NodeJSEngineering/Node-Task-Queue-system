import axios from "axios";
export const baseurl = "http://localhost:4000/api/v1"
export const getAndDeleteReq = async(url , method)=>{
    try {
        const response = await axios({
            url,
            method,
            withCredentials:true
        })
        console.log("response from apiCalls! " , response);
        return response.data
    } catch (error) {
        console.log("error from apiCalls! " , error)
    }
}
export const postAndUpdateReq = async(url , data , isFormData = false , method)=>{
    try {
        const response = await axios({
            url,
            method,
            data,
            withCredentials:true,
            headers:{"Content-Type" : isFormData ? "multipart/form-data" : "application/json"}
        })
        console.log("response from apiCalls: " , response);
        return response.data;
    } catch (error) {
        console.log("error from api calls! " , error);
    }
}
