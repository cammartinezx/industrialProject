import Header from "../Headers/Header";
import SignUpForm from "./SignUpForm";



const SignUp= () => {
  return (
    <>
      <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
        <Header/>

        <SignUpForm/>
      
      </div>
    </>
  );
};

export default SignUp;
