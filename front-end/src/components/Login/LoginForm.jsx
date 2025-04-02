import { heroBackground,} from "../../assets";
import Button from "../design/Button";
import { BackgroundCircles, BottomLine, Gradient } from "../design/LandingPageDesign";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Section from "../design/Section";
import { url } from "../../constants";
const LoginForm = () => {

  const parallaxRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required");
      return;
    }
    try {
      const response = await axios.post(`${url}/user/get-user`,{
        email,
      });
      console.log(response);

      if (response.status === 200 && response.data) {
        const { user: { user_id, role } } = response.data;
        localStorage.setItem("userId", user_id);
        localStorage.setItem("role", role);
  
        navigate("/dashboard", { state: { email, role } }); 
      } else {
        setError("Invalid credentials");
      } 
    } catch (err) {
      setError("Failed to login");
      console.error(err);
    }
  };


  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem]"
      crosses
      crossesOfset="lg:translate-y-[5.25rem]"
      customPaddings
      id="Login"
    >
      <div className="container relative" ref={parallaxRef}>
        

     <div className="grid grid-cols-2 gap-x-16 items-center h-screen px-20">

        <div className=" z-1  flex-1 max-w-[62rem]  mb-[4rem] md:mb-20 lg:mb-[6rem]">
          <h1 className="h1 mb-6">
          Let's make today productive!      
          </h1>
          <p className="body-1 max-w-3xl mb-6 text-n-2 lg:mb-8">
          Log in to access your courses, track progress, and connect with your learning community.</p>
         
          
        </div>
          <div className=" z-1 p-0.5 rounded-2xl  bg-conic-gradient flex-1 max-w-lg w-full">
            <div className="relative bg-n-8 rounded-[1rem] ">
            <div className="w-full bg-n-4/30 py-10 px-15  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center  mb-6 mt-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        

        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold pb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold pb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border  rounded-lg focus:ring focus:ring-blue-300 bg-n-4/20 mb-10"
              required
            />
          </div>

          <p className="text-sm  text-center text-n-2 ">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 font-semibold hover:underline ">
            Sign Up
          </a>
        </p>

        <div className="flex justify-center ">
          <Button type="submit" white className="w-1/3 py-3">
            Log In
          </Button>
        </div>

        </form>

      </div>
          
            </div>
          
        </div>
        <Gradient />
          
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

      <BottomLine />
    </Section>
  );
};

export default LoginForm;
