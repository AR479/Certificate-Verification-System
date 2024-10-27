import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_END_POINT } from '../utils/constant'; 
import GenerateCertificate from './GenerateCertificate';
import Header from './Header';

const Student = () => {
    const [certificateId, setCertificateId]=useState("");
    const [showCertificate, setShowCertificate]=useState(false);
    const [userData, setUserData] = useState(null);

    const handleSearch = async(e)=>{
        e.preventDefault();
        // console.log("working fine!");
        const id={certificateId};
        try {
            const res = await axios.post(`${API_END_POINT}/certificate`,id);
            if(res.data.success){
                toast.success(res.data.message);
                console.log(res.data.userData);
                setUserData(res.data.userData);
                setShowCertificate(true);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }
  return (
    
    <div>
        <Header/>
        <div className='absolute'>
                <img className='w-[100vw] h-[100vh] bg-cover' src="https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63496.jpg" alt="banner" />
        </div>

    { !showCertificate && (
        <form onSubmit={handleSearch} className="absolute flex flex-col gap-4 min-w-full justify-center items-center mt-24">
          {/* Input Field for Certificate ID */}
          <div>
            <label
              htmlFor="certificateId"
              className="text-sm font-medium text-gray-700"
            >
              Enter Certificate ID
            </label>
            <input
              type="text"
              id="certificateId"
              value={certificateId}
              onChange={(e) => setCertificateId(e.target.value)}
              placeholder="e.g., CERT12345"
              className="mt-1 block min-w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search Certificate
            </button>
          </div>
        </form>
  )}
    {showCertificate && <GenerateCertificate userData={userData}/>}
    </div>
  );
};

export default Student;
