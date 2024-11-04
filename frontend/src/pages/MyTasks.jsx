import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {getAndDeleteReq , baseurl} from "../utils/apiCalls"

export default function MyTasks(){
    const [tasks , setTasks] = useState([]);
    const user = JSON.parse(sessionStorage.getItem("User"));
    const userId = user ? user._id : null
    useEffect(()=>{
        const getAllTasks = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseurl}/task/user/getalltasks/${userId}`);
                console.log("response from user specified all tasks! " , response);
                setTasks(response.data);
                return response.data;
            } catch (error) {
                console.log("error from get all user specified tasks! " , error)
            }
        }
        getAllTasks();
    } , [userId])
    return(
        <section className="">=
            {/* filter and job card */}
            <div className="flex flex-col md:flex-row justify-center mx-4 md:mx-10">

                <div className="w-full md:w-2/4">
                <h1 className="text-center text-2xl text-orange-600">All Your Tasks</h1>
                {
                    tasks && tasks.length > 0 ? tasks.map((task)=>(
                        <div className="w-full flex justify-center mt-16" key={task._id}>
                            <div className="border-2 w-full max-w-screen-sm max-h-56 px-6 py-4 bg-slate-700 rounded-md">
                                <div className="w-full">
                                    <h5 className="text-lg font-bold mb-2">{task.name}</h5>
                                    {/* <div className="my-5 flex text-sm"> */}
                                        <p className="mr-2 my-4 mb-4">{task.description}</p>
                                    {/* </div> */}
                                    <Link to={`/requesttask/${task._id}`}
                                    className="bg-orange-500 hover:bg-orange-700 transition-colors px-4 py-2 
                                    rounded-md w-auto text-center block mt-6">View Requests</Link>
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