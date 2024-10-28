import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
export default function Login(){
    const [loginData , setLoginData] = useState({
        email:"",
        password:""
    })
    console.log("the data from loginData " , loginData);
    const {login , user} = useAuth();
    const handleSubmit = (e)=>{
        e.preventDefault();
        try {
            login(loginData);
        } catch (error) {
            console.log("error from the login Fomr: " , error)
        }
    }
    console.log("the user from global state " , user);
    return (
        <form className="max-w-sm mx-auto mt-6 rounded-lg shadow-md text-center py-4" onSubmit={handleSubmit}>
            <h1 className="font-bold text-xl mb-4">Login</h1>
            <input type="email" placeholder="example@email.com" className="w-full py-4 px-2 rounded outline-none bg-slate-600 text-white my-2" value={loginData.email} onChange={(e)=>setLoginData({...loginData , email:e.target.value})}/><br />
            <input type="password" placeholder="password@1234" className="w-full py-4 px-2 rounded outline-none bg-slate-600 text-white my-2" value={loginData.password} onChange={(e)=>setLoginData({...loginData , password:e.target.value})}/><br />
            <p> Dont Have Account? <Link to={"/register"} className="hover:text-orange-600 hover:border-b-2 my-2 text-orange-400">Register
            </Link></p>
            <button type="submit" className="hover:transition-colors hover:bg-orange-700 bg-orange-600 w-full p-4 rounded text-2xl my-2">
            Login</button>
        </form>
    )
}