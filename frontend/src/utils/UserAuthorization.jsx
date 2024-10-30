/* eslint-disable react/prop-types */
import { useEffect } from "react";
import {Outlet, useNavigate} from "react-router-dom";
const LocalUser = ()=>{
    const navigate = useNavigate();
    try {
        const user = sessionStorage.getItem("User");
        return user ? JSON.parse(user) : navigate("/");
    } catch (error) {
        console.log("localUser error: " , error);
        return null;
    }
}

const PrivateRoute = ({requiredRole , children})=>{
    const navigate = useNavigate();
    const user = LocalUser();
    useEffect(()=>{
        if(!user){
            return navigate("/login");
        }
        if(requiredRole && requiredRole !== user.role){
            console.log("u r forbidden to access this route:::");
            return navigate("/");
        }
        
    } , [navigate , user , requiredRole])
    return user && (!requiredRole || requiredRole === user.role) ?
    (children ? children : <Outlet/>) : null;
}

export default PrivateRoute;