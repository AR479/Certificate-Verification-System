import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const Admin = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data);
        } catch (error) {
            alert('Error uploading file: ' + error);    
        }
    };

    return (
        <div>
            <Header/>
            <img className='absolute w-[100vw] h-[100vh] bg-cover' src="https://img.freepik.com/free-photo/abstract-luxury-gradient-blue-background-smooth-dark-blue-with-black-vignette-studio-banner_1258-63496.jpg" alt="banner" />
            <form className='flex flex-col items-center justify-center mt-24 absolute min-w-full' onSubmit={handleSubmit}>
                <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
            <   button className='bg-blue-600 mt-6 items-center text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' type="submit">Upload</button>
            </form>
        </div>
        
    );
};

export default Admin;
