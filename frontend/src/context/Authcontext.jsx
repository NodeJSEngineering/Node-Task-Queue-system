/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext , useContext, useEffect, useState } from "react";
import {baseurl , getAndDeleteReq, postAndUpdateReq } from "../utils/apiCalls"
// import { useNavigate } from "react-router-dom";
const Authcontext = createContext({
    user:null,
    register:()=>{},
    login:()=>{},
    logout:()=>{}
})

const useAuth = ()=>useContext(Authcontext);
const AuthProvider = ({children})=>{
    // const navigate = useNavigate();
    const [isloading , setIsLoading] = useState(true);
    const [isError , setIsError] = useState(null);
    const [user , setUser] = useState(null);
    console.log("user from auth context: " , user);
    

    const register = async(data)=>{
        try {
            const response = await postAndUpdateReq(`${baseurl}/user/register`, data , null , "post");
            response.data ? sessionStorage.setItem("User" , JSON.stringify(response.data)) : null;
            setUser(response.data);
        } catch (error) {
            setIsError(error);
            console.log("error from contextApi: " , error);
        }finally{
            setIsLoading(false);
        }
    }

    const login = async(data)=>{
        try {
            const response = await postAndUpdateReq(`${baseurl}/user/login` , data , null , "post");
            response.data ? sessionStorage.setItem("User" , JSON.stringify(response.data)) : null;
            setUser(response.data);
            // navigate("/");
        } catch (error) {
            setIsError(error);
            console.log("error from contextApi " , error);
        }finally{
            setIsLoading(false);
        }
    }

    const logout = async()=>{
        try {
            const response = await getAndDeleteReq(`${baseurl}/user/logout` , "get");
            user ? setUser(null) : null;
            sessionStorage.clear();
            return response;
        } catch (error) {
            console.log("Error from contextApi: " , error);
            setIsError(error);
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(()=>{
        const storeUser = JSON.parse(sessionStorage.getItem("User"));
        // JSON.parse(storeUser);
        storeUser ? setUser(storeUser) : null;
        
    } , [])
    return(
        <Authcontext.Provider value={{register , login , logout , user , isError , isloading , setIsLoading , setIsError}}>
            {children}
        </Authcontext.Provider>
    )
}

export {Authcontext , AuthProvider , useAuth}