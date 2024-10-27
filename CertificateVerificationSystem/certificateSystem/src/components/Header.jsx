import React from 'react'
import axios from 'axios';
import { API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate=useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${API_END_POINT}/logout`);
            if(res.data.success){
                toast.success(res.data.message);
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='absolute z-10 flex w-full items-center justify-between px-6 bg-gradient-to-b from-blue-600'>
            <h1 className='text-white font-bold w-56 text-center text-2xl'>Certificate Verification System</h1>
            {  
                    <div className='flex items-center'>    
                        <div className='ml-4'>
                            <button onClick={logoutHandler} className='bg-blue-600 text-white px-4 py-2'>Logout</button>
                        </div>
                    </div>
                
            }

        </div>
    )
}

export default Header