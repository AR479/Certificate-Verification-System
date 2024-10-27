import React from 'react';
import html2pdf from "html2pdf.js"
import companyLogo from "../assets/companylogo.jpg"

const GenerateCertificate = (props) => {
    console.log(props.userData.name); 

    const startDate = new Date(props.userData.startDate).toLocaleDateString('en-GB');
    const endDate = new Date(props.userData.endDate).toLocaleDateString('en-GB');

    const downloadOption=()=>{
        const formContainer=document.getElementById('formContainer');
        html2pdf().from(formContainer).set({
            margin: 0,
            filename: 'certificate.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' }
        }).save();
    }
    
return (
    <div className='absolute flex items-center justify-center flex-col min-w-full mt-6'>
    <div id='formContainer' className="flex justify-center items-center mt-16">
      <div className="bg-white p-10 rounded-lg shadow-xl border-8 border-blue-500 max-w-4xl">
        <div className="text-center mb-10">
          <img src={companyLogo} alt="Company Logo" className="mx-auto w-24 mb-6" />
          <h1 className="text-3xl font-bold text-blue-500 uppercase tracking-wider border-b-2 border-blue-500 inline-block pb-2">
            Certificate of Internship
          </h1>
        </div>
        <div className="text-center text-gray-600">
          <p>This is to certify that</p>
          <h2 className="text-4xl font-bold text-blue-500 uppercase mt-4">{props.userData.name}</h2>
          <p className="mt-4">has successfully completed the internship in</p>
          <h3 className="text-2xl font-semibold mt-2">{props.userData.domain}</h3>
          <p className="mt-4">from</p>
          <h3 className="text-xl font-semibold mt-2">20/7/2024 to 20/10/2024</h3>
          <p className="mt-4">During this period, [he/she] exhibited excellent skills and completed all assigned tasks with great diligence.</p>
        </div>
        <div className="flex justify-between mt-10">
          <div className="text-center">
            {/* <img src={signatureCeoSrc} alt="CEO's Signature" className="w-32 mx-auto mb-2 border-b-2 border-gray-300" /> */}
            <p className="text-lg font-bold text-blue-500">Shyam Surya</p>
            <p className="text-gray-600">CEO</p>
          </div>
          <div className="text-center">
            {/* <img src={signatureManagerSrc} alt="Program Manager's Signature" className="w-32 mx-auto mb-2 border-b-2 border-gray-300" /> */}
            <p className="text-lg font-bold text-blue-500">B Neeraj</p>
            <p className="text-gray-600">Program Manager</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex justify-center mt-4">
        <button onClick={downloadOption} className="bg-blue-600 mt-2 items-center text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Download</button>
      </div>
      </div>
  );
};


export default GenerateCertificate;
