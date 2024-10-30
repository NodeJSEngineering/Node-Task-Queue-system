import { useEffect, useState } from "react";
import { baseurl, getAndDeleteReq, postAndUpdateReq } from "../utils/apiCalls";

export default function NewTask(){
    const [labels , setLabels] = useState([]);
    const storedUser = JSON.parse(sessionStorage.getItem("User"));
    useEffect(()=>{
        const getAllLabels = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseurl}/label/getalllabels`);
                setLabels(response.data);
            } catch (error) {
                console.log("error from get All labels! " , error)
            }
        }
        getAllLabels();
    } , [])
    const [TaskData , setTaskData] = useState({
        name:"",
        description:"",
        user:storedUser ? storedUser._id : null,
        label:""
    })
    const newTaskReq = async(data)=>{
        try {
            const response = await postAndUpdateReq(`${baseurl}/task/newtask` , data , null , "post");
            return response.data;
        } catch (error) {
            console.log("error from newTaskReq! " , error);
        }
    }
    const handleNewTask = async(e)=>{
        e.preventDefault();
        try {
            newTaskReq(TaskData);
        } catch (error) {
            console.log("error from handle task request! " , error)
        }
    }
    return (
        <form className="mx-auto text-center mt-6 shadow-md rounded-lg p-4 max-w-sm" onSubmit={handleNewTask}>
            <h1 className="text-center font-bold text-2xl mb-4">Create New Task</h1>
            <input type="text" placeholder="username@123" required className="my-2 outline-none bg-slate-600 rounded w-full focus:outline-none focus: px-2 py-4" onChange={(e)=>setTaskData({...TaskData , name:e.target.value})} /><br />
            <textarea type="text" placeholder="description for the task" required className="my-2 outline-none bg-slate-600 rounded w-full focus:outline-none focus: px-2 py-4" onChange={(e)=>setTaskData({...TaskData , email:e.target.value})}></textarea><br />
            <select className="outline-none w-full bg-slate-600 px-6 py-4 rounded-md" value={TaskData.label} onChange={(e)=>setTaskData({...TaskData , label:e.target.value})}>
                {
                    labels.map((label)=>(
                        <option value={label._id} key={label._id}>{label.name}</option>
                    ))
                }
                
            </select>
            <button type="submit" className="w-full bg-orange-600 p-3 rounded text-xl mt-2 text-white hover:bg-orange-700 transition-colors">New Task</button>
        </form>
    )
} 