import Heading from "./Heading";
import Section from "./Section";

import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import Button from "./Button";
import ButtonGradient from "../assets/svg/ButtonGradient";
import { Link } from "react-router-dom";
import { cardbg, check } from "../assets";
import HeaderStudent from "./HeaderStudent.jsx";
import Services from "./Services";




const info = {
    id: "ASTR1080",
    title: "Introduction to astronomy",
    text: "Explore the fundamentals of astronomy, including the study of stars, planets, galaxies, and the universe's structure.",
    instructor: "John Doe"
  };
    



const units = [
  {
    title: "The Solar System",
  },
  {
    title: "The Sun and Its Energy",
  },
  {
    title: "The Moon and Tides",
  },
  {
    title: "Light and Telescopes",
  },
  {
    title: "The Stars: Birth, Life, and Death",
  },
  {
    title: "The Universe: Big Bang and Expansion",
  },
  
];
const CourseMain = () => {
  return (
    <>
    <HeaderStudent/>
        <div className="container relative z-2 mt-28">
                  <h2 className="h2 mb-4 font-bold">{info.title}</h2>
                  <p className="body-2 mb-[1rem] text-n-3">
                  {info.text}
                  </p>
                  <ul className="body-2 flex justify-between">
  <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
    <img width={24} height={24} src={check} />
    <p className="ml-4">
      <span className="font-semibold">Course Code:</span> {info.id}
    </p>
  </li>
  <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
    <img width={24} height={24} src={check} />
    <p className="ml-4">
      <span className="font-semibold">Instructor:</span> {info.instructor}
    </p>
  </li>
  <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
    <img width={24} height={24} src={check} />
    <p className="ml-4">
      <span className="font-semibold">Enrolled On:</span> 09/11/2024
    </p>
  </li>
</ul>





                </div>


    
    <div className="container relative z-2">
  
    <div className="flex flex-col gap-6 mt-10 mb-6 w-full">
        {units.map((item, index) => (
          <div
          className="group block relative  bg-no-repeat bg-[length:100%_100%] w-full sm:max-w-[60%] md:max-w-[90rem] mx-auto" // Added mx-auto to center the cards and reduce the max-width on smaller screens
          style={{
            backgroundImage: `url(${
                index % 2 === 0
                  ? "src/assets/course_cards/card-1.svg"
                  : "src/assets/course_cards/card-2.svg"
              })`,
            }}
            key={item.id}
          >
            <div className="flex justify-between items-center w-full px-6 py-4">
  <h5 className="h5 mt-7 mb-2">
    <span className="font-extrabold">Unit {index + 1} </span>
    <span className="ml-3">{item.title}</span>
  </h5>

  <div className="flex items-center space-x-2">
    <Link to="/chat" className="z-50">Start chat</Link>
    <Arrow className="w-6 h-6 text-white" />
  </div>
</div>




            <div className="absolute inset-0.5 " style={{ clipPath: "url(#benefits)" }}>
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-25">
                <img
                  src={cardbg}
                  width={380}
                  height={362}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
  
         
           
           


          </div>
        ))}
      </div>
    </div>
  

  

       
  </>
  );
};

export default CourseMain;
