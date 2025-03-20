import { heroBackground } from "../../assets";

import { BackgroundCircles } from "../design/Hero";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../design/Button";
import { majors, languageOptions, locationOptions } from "../../constants";

const InstructorForm = () => {
  const parallaxRef = useRef(null);

  const [department, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [location, setLocation] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!department|| !dob || !location || !preferredLanguage) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://your-api.com/signup", {
       department,
        dob,
      
        location,
        preferredLanguage,
     
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        navigate("/dashboard_student"); // Redirect to dashboard
      } else {
        setError("Failed to sign up");
      }
    } catch (err) {
      setError("Failed to sign up");
      console.error(err);
    }
  };

  return (
    <>
      <div className="container justify-center items-center relative pt-[12rem] -mt-[7.25rem]" ref={parallaxRef}>
        <div className="relative w-full min-h-screen flex justify-center items-center mb-15">
          <div className="z-1 p-0.5 rounded-2xl bg-conic-gradient max-w-lg w-full ">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="w-full bg-n-4/30 p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 mt-6">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSignUp} className="space-y-6">
                 
                  {/* Degree */}
                 

                  <div>
                    <label className="block text-sm font-semibold pb-2">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
                      required
                    >
                      <option value="" disabled></option>
                      {majors.map((majorOption, index) => (
                        <option key={index} value={majorOption}>
                          {majorOption}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label className="block text-sm font-semibold pb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
                      required
                    />
                  </div>

                
    {/* Location */}
    <div>
      <label className="block text-sm font-semibold pb-2">Location</label>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
        required
      >
        <option value="" disabled></option>
        {locationOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>

    {/* Preferred Language */}
    <div>
      <label className="block text-sm font-semibold pb-2">Preferred Language</label>
      <select
        value={preferredLanguage}
        onChange={(e) => setPreferredLanguage(e.target.value)}
        className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20 mb-16"
        required
      >
        <option value="" disabled></option>
        {languageOptions.map((language) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
                  {/* Sign Up Button */}
                  <div className="flex justify-center mt-6">
                    <Button type="submit" white className="w-1/3 py-3" href={"/dashboard-student"}>
                      Sign Up
                    </Button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
          <img src={heroBackground} className="w-full" width={1440} height={1800} alt="hero" />
        </div>

        <BackgroundCircles />
      </div>
    </>
  );
};

export default InstructorForm;
