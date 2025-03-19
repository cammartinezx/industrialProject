import { heroBackground } from "../../assets";

import { BackgroundCircles } from "../design/Hero";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../design/Button";
import { majors } from "../../constants";

const StudentForm = () => {
  const parallaxRef = useRef(null);

  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [gpa, setGpa] = useState("");
  const [location, setLocation] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!major|| !dob || !gpa || !location || !preferredLanguage) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post("https://your-api.com/signup", {
       
        dob,
        gpa,
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
      <div className="container justify-center items-center relative pt-[12rem] -mt-[7.25rem] mb-40" ref={parallaxRef}>
        <div className="flex justify-center h-screen">
          <div className="z-1 p-0.5 rounded-2xl bg-conic-gradient max-w-lg w-full ">
            <div className="relative bg-n-8 rounded-[1rem]">
              <div className="w-full bg-n-4/30 p-10 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 mt-6">Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <form onSubmit={handleSignUp} className="space-y-6">
                 
                  {/* Degree */}
                 

                  <div>
                    <label className="block text-sm font-semibold pb-2">Major</label>
                    <select
                      value={major}
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

                  {/* GPA */}
                  <div>
                    <label className="block text-sm font-semibold pb-2">GPA</label>
                    <select
                      value={gpa}
                      onChange={(e) => setGpa(e.target.value)}
                      className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
                      required
                    >
                      <option value="" disabled></option>
                      <option value="less_than_2">Less than 2</option>
                      <option value="2_to_2_5">2 to 2.5</option>
                      <option value="2_5_to_3">2.5 to 3</option>
                      <option value="3_to_3_5">3 to 3.5</option>
                      <option value="3_5_to_4">3.5 to 4</option>
                      <option value="4_to_4_5">4 to 4.5</option>
                      <option value="4_5_plus">4.5+</option>
                    </select>
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
                      <option value="Toronto">Toronto</option>
                      <option value="Vancouver">Vancouver</option>
                      <option value="Montreal">Montreal</option>
                      <option value="Calgary">Calgary</option>
                      <option value="Winnipeg">Winnipeg</option>
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
                      <option value="English">English</option>
                      <option value="French">French</option>
                    </select>
                  </div>

                 
                  {/* Sign Up Button */}
                  <div className="flex justify-center mt-6">
                    <Button type="submit" white className="w-1/3 py-3" href={"/dashboard-student"}>
                      Continue
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

export default StudentForm;
