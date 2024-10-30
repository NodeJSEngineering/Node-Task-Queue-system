import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { baseurl, getAndDeleteReq } from "../utils/apiCalls";

export default function TaskDetail(){
    const {taskId} = useParams();
    const [task , setTask] = useState(null);
    useEffect(()=>{
        const getTask = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseurl}/task/${taskId}` , "get")
                setTask(response.data);
                console.log("response from task apiCall !" , response)
            } catch (error) {
                console.log("error from get a task!" , error);
            }
        }
        getTask();
    } , [taskId])
    console.log("task id from use params! " , taskId);
    return (
       <>
       <div className="max-w-lg mx-auto p-6 shadow-2xl bg-white-900 rounded-md mt-8 text-center">
            <h1>Task Details</h1>
            <div className="bg-slate-900 p-4 rounded-md shadow-sm">
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-white-700 text-left">{task ? task.name : "name"}</h3>
                </div>
            </div>
            <div className="mt-4 text-gray-600 text-left mb-4">
                <h4 className="font-semibold text-white">About the Task</h4>
                <p className="text-white">{task ? task.description : "description"}</p>
            </div>
            <div className="text-left">
                <span className="font-semibold text-lg px-2 py-2">Task Label :</span>
                <span className="font-semibold text-lg py-2">label</span>
            </div>
            <div className="text-left">
                <span className="font-semibold text-lg px-2 py-2">Task Owner :</span>
                <span className="font-semibold text-lg py-2">Owner</span>
            </div>
            <button 
            className="text-gray-700 mt-5 bg-orange-500 hover:bg-orange-700 hover:transition-colors 
            px-5 py-3 rounded mx-2">Request Request</button>
       </div>
       </>
    )
}