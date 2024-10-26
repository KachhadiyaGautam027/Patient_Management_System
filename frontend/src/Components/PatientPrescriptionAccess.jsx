import React from "react";

const PatientPrescriptionAccess = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Prescription Access</h1>
        <div className="flex items-center space-x-2">
          <i className="fas fa-calendar-alt text-gray-500"></i>
          <span className="text-gray-500">2 Jan, 2022 - 13 Jan, 2022</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(5)
          .fill()
          .map((_, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="font-semibold">Dr. Ryan Vetrous</h2>
                  <p className="text-sm text-gray-500">Artemis Hospital</p>
                </div>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-circle text-blue-500 text-xs"></i>
                  <i className="fas fa-ellipsis-v text-gray-500"></i>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Disease Name</p>
                <p className="text-sm">Viral Infection</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-sm">2 Jan, 2022</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Time</p>
                <p className="text-sm">10:03 AM</p>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fas fa-file-alt text-blue-500"></i>
                <span className="text-sm">Prescription.JPG</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PatientPrescriptionAccess;
