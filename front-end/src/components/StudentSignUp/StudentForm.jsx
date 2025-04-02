import { heroBackground } from "../../assets";

import { BackgroundCircles } from "../design/LandingPageDesign";
import { useRef } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../design/Button";
import { majors, gpaOptions, languageOptions, locationOptions, learningStyleOptions, url } from "../../constants";

const StudentForm = () => {
  const parallaxRef = useRef(null);
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const role = location.state?.role || localStorage.getItem("role");
  const [major, setMajor] = useState("");
  const [dob, setDob] = useState("");
  const [gpa, setGpa] = useState("");
  const [city, setCity] = useState("");

  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [preferredLearningStyle, setPreferredLearningStyle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!major|| !dob || !gpa || !location || !preferredLanguage) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(`${url}/student/${userId}/create-student`, {
        dob,
        gpa,
        city,
        preferredLanguage,
     
      });
      console.log(response);

      if (response.status === 200) {
        alert('Your account has been created');
        navigate("/dashboard",{ state: {userId, role } }); // Redirect to dashboard
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
        {gpaOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    {/* Location */}
    <div>
      <label className="block text-sm font-semibold pb-2">Location</label>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
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
        className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20 "
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
     {/* Preferred Learning Style */}
     <div>
      <label className="block text-sm font-semibold pb-2">Preferred Learning Style</label>
      <select
        value={preferredLearningStyle}
        onChange={(e) => setPreferredLearningStyle(e.target.value)}
        className="w-full py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20 mb-16"
        required
      >
        <option value="" disabled></option>
        {learningStyleOptions.map((style) => (
          <option key={style.value} value={style.value}>
            {style.label}
          </option>
        ))}
      </select>
    </div>
      
                 
                  <div className="flex justify-center mt-6">
                    <Button type="submit" white className="w-1/3 py-3">
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

export default StudentForm;
