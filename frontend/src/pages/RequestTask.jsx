import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { baseurl, getAndDeleteReq, postAndUpdateReq } from "../utils/apiCalls";

export default function RequestTask(){
    const {taskId} = useParams();
    const [requests , setRequests] = useState([]);
    useEffect(()=>{
        const getAllRequests = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseurl}/requesttask/task/getallrequests/${taskId}`);
                console.log("response from get all requests from a task! " , response);
                setRequests(response.data);
                return response.data
            } catch (error) {
                console.log("error from all requests from a task! " , error)
            }
        }
        getAllRequests();
    } , [taskId])

    const handleAcceptReject = async(requestId , action)=>{
        try {
            const response = await postAndUpdateReq(`${baseurl}/requesttask/task/acceptreject` , {requestId , action} , null , "post");
            console.log("response from handleAcceptReject! " , response.data);
            return response.data; 
        } catch (error) {
            console.log("error from handleAcceptReject! " , error)
        }
    }
    console.log("task id from use params! " , taskId);
    return (
        <section className="">=
            {/* filter and job card */}
            <div className="flex flex-col md:flex-row justify-center mx-4 md:mx-10">

                <div className="w-full md:w-2/4">
                <h1 className="text-center text-2xl text-orange-600">Task Requests</h1>
                {
                    requests && requests.length > 0 ? requests.map((request)=>(
                        <div className="w-full flex justify-center mt-16 h-auto" key={request._id}>
                            <div className="border-2 w-full max-w-screen-sm  px-6 py-4 bg-slate-700 rounded-md">
                                <div className="w-full">
                                    <h6>Task: {request.task.name}</h6>
                                    <h5 className="text-lg font-bold mb-2">user: {request.requestedUser.name}</h5>
                                    {/* <div className="my-5 flex text-sm"> */}
                                        <p className="mr-2 my-4 mb-4">Task Description: {request.description}</p>
                                    {/* </div> */}
                                    <button onClick={()=>(handleAcceptReject(request._id , "accept"))} className="w-full bg-orange-600 p-3 rounded text-xl mt-2 text-white hover:bg-orange-700 transition-colors">Accept</button>
                                    <button onClick={()=>(handleAcceptReject(request._id , "reject"))} className="w-full bg-orange-600 p-3 rounded text-xl mt-2 text-white hover:bg-orange-700 transition-colors">Reject</button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="w-full flex justify-center mt-16" >
                            <div className="border-2 w-full max-w-screen-sm max-h-56 px-6 py-4 bg-slate-700 rounded-md">
                                <div className="w-full">
                                    <h5 className="text-lg font-bold mb-2">task_name</h5>
                                    {/* <div className="my-5 flex text-sm"> */}
                                        <p className="mr-2 my-4 mb-4">task_description</p>
                                    {/* </div> */}
                                    <Link to={`/taskDetail/`}
                                    className="bg-orange-500 hover:bg-orange-700 hover:transition-colors px-6 py-2 
                                    rounded-md block justify-center mt-6 w-20 text-center">View Requests</Link>
                                </div>
                            </div>
                        </div>
                    )
                }
                </div>
                

            </div>
            {/* <slectA />   */}
            
            
            
        </section>
    )
}