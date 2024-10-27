import React, { useState } from 'react'
import Header from './Header'
import axios from "axios"
import toast from  "react-hot-toast"
import { API_END_POINT } from '../utils/constant'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole]=useState("student");
    const navigate=useNavigate();
    const [isLoading, setIsLoading]=useState(false);

    const loginHandler = () => {
        setIsLogin(!isLogin);
    }

    const getInputData = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        if(isLogin){
            const user={email,password};
            try {
                const res = await axios.post(`${API_END_POINT}/login`,user);
                console.log("RES:",res);
                if(res.data.success){
                    toast.success(res.data.message);
                }
                if(res.data.userRole=="admin"){
                    navigate("/admin");
                }else{
                    navigate("/student");
                }
                
            } catch (error) {
                toast.error(error.response.data.message);
            } finally{
                setIsLoading(false);
            }
            
        }else{
            const user={fullName,email,password,role};
            console.log("user:",user);
            try {
                const res=await axios.post(`${API_END_POINT}/register`,user);
                if(res.data.success){
                    toast.success(res.data.message);
                    setIsLogin(true);
                }
            } catch (error) {
                toast.error(error.response.data.message);
            } finally{
                setIsLoading(false);
            }
        }

        //console.log(fullName,email,password
        setFullName("");
        setEmail("");
        setPassword("");
        setRole("student");
    }

    return (
        <div>
            <div className='absolute'>
                <img className='w-[100vw] h-[100vh] bg-cover' src="https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63496.jpg" alt="banner" />
            </div>
            <div className="absolute flex justify-center items-center mt-16 min-w-full">
                <h1 className='text-6xl text-black-500 font-bold underline'>Certificate Verification System</h1>
            </div>
            <form onSubmit={getInputData} className='flex flex-col w-3/12 p-12 my-36 left-0 right-0  mx-auto mt-52 items-center justify-center absolute rounded-md bg-black opacity-90'>
                <h1 className='text-3xl text-white mb-5 font-bold'>{isLogin ? "Login" : "Signup"}</h1>
                <div className='flex flex-col'>
                    {
                        !isLogin && <input value={fullName} onChange={(e)=>setFullName(e.target.value)} type='text' placeholder='Fullname' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    }
                    <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='Email' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='Password' className='outline-none p-3 my-2 rounded-sm bg-gray-800 text-white' />
                    <button type='submit' className='bg-blue-600 mt-6 p-3 text-white rounded-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>{isLoading?"Loading....": (isLogin?"Login":"Signup")}</button>
                    
                    { !isLogin && <div className='mt-5 ml-8'>
                            <label>Role:</label>
                            <select
                            name="role"
                            value={role}
                            onChange={(e)=>setRole(e.target.value)}
                            required
                            >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                            </select>
                        </div>
                    }
                    
                    <p className='text-white mt-2'>{isLogin ? "New to System?" : "Already have an account?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></p>
                </div>
            </form>
        </div>
    )
}

export default Login