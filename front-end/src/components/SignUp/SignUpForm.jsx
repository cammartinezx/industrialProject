import { heroBackground,} from "../../assets";

import { BackgroundCircles} from "../design/Hero";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../design/Button";
import { url } from "../../constants";
const SignUpForm = () => {
const parallaxRef = useRef(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password || !role || !name) {
      setError("All fields are required");
      return;
    }
    try {
      const response = await axios.post(`${url}/user/add-user`, {
        email,
        name,
        role
      });

      if (response.status === 200) {
        const {userId} = response.data; 
        console.log(userId);
        localStorage.setItem("name", name) 
        //localStorage.setItem("token", token); 
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);


        navigate(role === "student" ? "/student-signup" : "/instructor-signup")
      }else{
        setError("Failed to Sign Up");
      }
      
    } catch (err) {
      setError("Failed to Sign Up");
      console.error(err);
    }
  };
  return (
    <
    >
      <div className="container justify-center items-center relative pt-[12rem] -mt-[7.25rem] " ref={parallaxRef} >
        

     <div className="relative w-full min-h-screen flex justify-center items-center mb-15">

       
        <div className="z-1 p-0.5 rounded-2xl bg-conic-gradient max-w-lg w-full">
  <div className="relative bg-n-8 rounded-[1rem] ">
    <div className="w-full bg-n-4/30 p-10 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 mt-6">Sign Up</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSignUp} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold pb-2">First Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold pb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
            required
          />
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-semibold pb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full  py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
            required
          >
            <option value="" disabled></option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-semibold pb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-semibold pb-2">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
            required
          />
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-red-500 text-sm mt-2">Passwords do not match.</p>
          )}
        </div>
        <div className="flex justify-center mt-6">
        <Button 
  type="submit" 
  white 
  className="w-1/3 py-3"
 
>
  Continue
</Button>
</div>

        {/* Already have an account? */}
        <p className="text-sm text-center text-n-2 pt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Log In
          </a>
        </p>
      </form>
    </div>
  </div>
</div>



          
          </div>

          
          <div className="absolute -top-[54%] left-1/2 w-[234%] -translate-x-1/2 md:-top-[46%] md:w-[138%] lg:-top-[104%]">
            <img
              src={heroBackground}
              className="w-full"
              width={1440}
              height={1800}
              alt="hero"
            />
          </div>
          
         

          <BackgroundCircles />
        

     
      </div>


    </>
  );
};

export default SignUpForm;