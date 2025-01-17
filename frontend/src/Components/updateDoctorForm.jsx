import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { toast } from 'react-toastify';
import { FaUserCircle } from "react-icons/fa";
import { FaSignature } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UodateDoctorForm = () => {
  const { id } = useParams();

  const [doctorData, setDoctorData] = useState({
    DoctorName: '',
    DoctorQualification: '',
    gender: '',
    specialtiyType: '',
    WorkOn: '',
    workingTime: '',
    CheckupTime: '',
    BreakTime: '',
    Experience: '',
    phoneNumber: '',
    age: '',
    DoctorEmail: '',
    country: '',
    state: '',
    city: '',
    ZipCode: '',
    DoctorAddress: '',
    Description: '',
    OnlineConsultationRate: '',
    DoctorCurrentHospital: '',
    HospitalName: '',
    HospitalAddress: '',
    HospitalWebsiteLink: '',
    EmergencyContactNumber: '',
    Password: '',
    DoctorImage: {},
    DoctorSignature: {},
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "photo") {
      setDoctorData((prevData) => ({ ...prevData, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    } else if (name === "signature") {
      setDoctorData((prevData) => ({ ...prevData, signature: file }));z
      setSignaturePreview(URL.createObjectURL(file));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("Doctor ID is missing");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8090/admin/UpdateDoctor/${id}`, doctorData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      toast.success("Doctor updated successfully!");
      console.log("Doctor updated successfully:", response.data);
      navigate('/doctordashboard')
    } catch (error) {
      console.error("Error details:", error.response || error);
      const errorMsg = error.response?.data?.msg || "Failed to update doctor. Please try again.";
      toast.error(errorMsg);
      console.error("Failed to update doctor:", errorMsg);
    }
  };


  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await fetch("http://localhost:8090/admin/alldoctors", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        const filterdata = data.filter((val) => val._id === id);
        setDoctorData(filterdata[0]);
        console.log("data", data);
      } catch (err) {
        console.error("Error fetching profile data:", err.message);
      }
    };

    fetchDoctorData();
  }, [id]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <div className="flex flex-col h-full">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-lg">
              <div className="flex">
                <div className="mr-6">
                  <div className="mb-6 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUserCircle size={50} className="text-gray-400" />
                      )}
                    </div>
                    <label className="block mt-2 font-medium">
                      Choose Photo
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 w-full border rounded-lg hidden"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
                      {signaturePreview ? (
                        <img
                          src={signaturePreview}
                          alt="Signature"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaSignature size={50} className="text-gray-400" />
                      )}
                    </div>
                    <label className="block mt-2 font-medium">
                      Upload Signature
                      <input
                        type="file"
                        name="signature"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 w-full border rounded-lg hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6 flex-grow">
                  <div>
                    <label className="block text-sm font-medium mb-1">Doctor Name</label>
                    <input
                      type="text"
                      name="DoctorName"
                      value={doctorData.DoctorName}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Doctor Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Doctor Qualification</label>
                    <input
                      type="text"
                      name="DoctorQualification"
                      value={doctorData.DoctorQualification}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Doctor Qualification"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Gender</label>
                    <select
                      name="gender"
                      value={doctorData.gender}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Specialty Type</label>
                    <input
                      type="text"
                      name="specialtiyType"  // Correct spelling here
                      value={doctorData.specialtiyType}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Specialty Type"
                      required  // This ensures the field is mandatory
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Work On</label>
                    <input
                      type="text"
                      name="WorkOn"
                      value={doctorData.WorkOn}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Work On"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Working Time (HH:MM)</label>
                    <input
                      type="text"
                      name="workingTime"
                      value={doctorData.workingTime}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Working Time"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Checkup Time (HH:MM)</label>
                    <input
                      type="text"
                      name="CheckupTime"
                      value={doctorData.CheckupTime}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Checkup Time"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Break Time (HH:MM)</label>
                    <input
                      type="text"
                      name="BreakTime"
                      value={doctorData.BreakTime}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Break Time"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Experience</label>
                    <input
                      type="text"
                      name="Experience"
                      value={doctorData.Experience}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Experience"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={doctorData.phoneNumber}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={doctorData.age}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Age"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Doctor Email</label>
                    <input
                      type="email"
                      name="DoctorEmail"
                      value={doctorData.DoctorEmail}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Doctor Email"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={doctorData.country}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Country"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={doctorData.state}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter State"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={doctorData.city}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter City"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Zip Code</label>
                    <input
                      type="number"
                      name="ZipCode"
                      value={doctorData.ZipCode}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Zip Code"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Doctor Address</label>
                    <input
                      type="text"
                      name="DoctorAddress"
                      value={doctorData.DoctorAddress}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Doctor Address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      name="Description"
                      value={doctorData.Description}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Description"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Online Consultation Rate</label>
                    <input
                      type="number"
                      name="OnlineConsultationRate"
                      value={doctorData.OnlineConsultationRate}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Rate"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Current Hospital</label>
                    <input
                      type="text"
                      name="DoctorCurrentHospital"
                      value={doctorData.DoctorCurrentHospital}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Current Hospital"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Hospital Name</label>
                    <input
                      type="text"
                      name="HospitalName"
                      value={doctorData.HospitalName}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Hospital Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Hospital Address</label>
                    <input
                      type="text"
                      name="HospitalAddress"
                      value={doctorData.HospitalAddress}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Hospital Address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Hospital Website Link</label>
                    <input
                      type="text"
                      name="HospitalWebsiteLink"
                      value={doctorData.HospitalWebsiteLink}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Website Link"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Emergency Contact Number</label>
                    <input
                      type="text"
                      name="EmergencyContactNumber"
                      value={doctorData.EmergencyContactNumber}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Emergency Contact Number"
                      required
                    />
                  </div>

                 <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="Password"
                            value={doctorData.Password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2"
                            placeholder="Enter Password"
                            required
                        />
                    </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                  Update Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UodateDoctorForm;
