import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { baseurl, getAndDeleteReq } from "../utils/apiCalls";

export default function AllTasks(){
    const [tasks , setTasks] = useState([]);
    useEffect(()=>{
        const getAllTasks = async()=>{
            try {
                const response = await getAndDeleteReq(`${baseurl}/task/getalltasks`);
                setTasks(response.data);
            } catch (error) {
                console.log("error from get All Tasks! " , error);
            }
        }
        getAllTasks();
    } , [])
    
    return (
        <section className="">
            {/* search---bar */}
            <div className="flex justify-center text-center mt-6">
                <input type="text" placeholder="search" className="outline-none px-6 py-4 bg-slate-700 mx-4 my-4 "/>
                <button type="button" className="bg-orange-600 hover:transition-colors hover:bg-orange-700 cursor-pointer md:px-6 
                px-3 py-4 rounded my-4">search</button>
            </div>
            {/* filter and job card */}
            <div className="flex flex-col md:flex-row justify-center mx-4 md:mx-10">
                {/* left filter section */}
                <aside className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-center font-bold text-2xl">Filters</h2>
                    <div>
                        <h5 className="text-lg font-semibold ">Label</h5>
                        <select className="w-full px-6 py-4 outline-none bg-slate-700">
                            <option>Labels</option>
                        </select>
                    </div>
                </aside>

                <div className="w-full md:w-2/4">
                {
                    tasks && tasks.length > 0 ? tasks.map((task)=>(
                        <div className="w-full flex justify-center mt-16" key={task._id}>
                            <div className="border-2 w-full max-w-screen-sm max-h-56 px-6 py-4 bg-slate-700 rounded-md">
                                <div className="w-full">
                                    <h5 className="text-lg font-bold mb-2">{task.name}</h5>
                                    <h6 className="text-sm mb-4">name of the organization</h6>
                                    {/* <div className="my-5 flex text-sm"> */}
                                        <p className="mr-2 my-4 mb-4">{task.description}</p>
                                    {/* </div> */}
                                    <Link to={`/taskDetail/${task._id}`}
                                    className="bg-orange-500 hover:bg-orange-700 hover:transition-colors px-6 py-2 
                                    rounded-md block justify-center mt-6 w-20 text-center">More</Link>
                                </div>
                            </div>
                        </div>
                    )) : ""
                }
                </div>
                

            </div>
            {/* <slectA />   */}
            
            
            
        </section>
    )
}