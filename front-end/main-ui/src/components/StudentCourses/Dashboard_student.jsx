import Courses from "./Courses";
import Header from "../Headers/Header.jsx";
import HeaderStudent from "../Headers/HeaderStudent.jsx";


Courses;



const Dashboard_student = () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <HeaderStudent/>
     

        <Courses/>
      
      </div>
     
    </>
  );
};

export default Dashboard_student;
