import HeaderForms from "../Headers/HeaderForms";
import StudentForm from "./StudentForm";


const StudentSignUp= () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <HeaderForms/>
        <StudentForm/>
      
      </div>
    </>
  );
};

export default StudentSignUp;
