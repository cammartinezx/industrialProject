import { curve, robot } from "../../assets";
import Button from "../design/Button";
import { BottomLine } from "../design/LandingPageDesign";
import { useRef } from "react";
import Section from "../design/Section";

const LandingPage = () => {
  const parallaxRef = useRef(null);

  return (
    <>
      {/* Hero Section */}
      <Section
        className="pt-[12rem] -mt-[5.25rem]"
        crosses
        crossesOfset="lg:translate-y-[5.25rem]"
        customPaddings
        id="hero"
      >
        <div className="container relative" ref={parallaxRef}>
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
            <h1 className="h1 mb-6">
              Learn Anything, Anytime with{" "}
              <span className="inline-block relative">
                EduNova{" "}
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2"
                  width={624}
                  height={28}
                  alt="curve"
                />
              </span>
            </h1>
            <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              Explore a world of knowledge with an AI-powered instructor by the Government of Canada. From science and technology to history and business, ask questions, dive into lessons, and master new skills—one chat at a time!
            </p>
            <div className="flex gap-4 justify-center">
              <Button href="/login" white>
                Login
              </Button>
              <Button href="/signup">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
        <BottomLine />
      </Section>

      {/* Features Section */}
      <Section id="features" className="pt-[6rem] -mt-[2.25rem]">
        <div className="container">
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[2rem] md:mb-10 lg:mb-[3rem]">
            <h2 className="h2 mb-4">Discover Our Features</h2>
            <p className="body-1 max-w-3xl mx-auto mb-4 text-n-2 lg:mb-6">
              Experience cutting-edge learning with our AI-powered platform designed to adapt to your needs
            </p>
          </div>

          {/* Image section commented out */}
          {/* <div className="relative bg-n-8 rounded-[1rem]">
            <div className="aspect-[33/40] rounded-2xl overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
              <img
                src={robot}
                className="w-full h-full object-cover"
                width={1024}
                height={490}
                alt="AI Features"
              />
            </div>
          </div> */}

          {/* Feature descriptions */}
          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-16 text-white text-center bg-n-8 rounded-[1rem] px-8 py-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Role-Play</h3>
              <p className="text-sm">Engage with Nova, the AI chatbot that simulates real-life role-play scenarios using admin-defined prompts.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Instructor Integration</h3>
              <p className="text-sm">Instructors can join, leave, and monitor conversations in real-time, ensuring effective guidance and intervention.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Scenario Management</h3>
              <p className="text-sm">Instructors can build, save, and reuse training scenarios for consistent learning experiences across sessions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Feedback</h3>
              <p className="text-sm">Students receive instant responses from Nova, creating an immersive and interactive training environment.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Conversation History</h3>
              <p className="text-sm">All sessions are recorded for grading, auditing, and feedback—ensuring transparency and growth tracking.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Cloud-Based Access</h3>
              <p className="text-sm">Access training modules from anywhere, anytime.</p>
            </div>
          </div>
        </div>
        <BottomLine />
      </Section>

      {/* About Us Section */}
      <Section id="about" className="mt-[6rem] pt-[6rem] pb-[4rem]">
      <div className="container">
    <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
      <h2 className="h2 mb-6">About Us</h2>
      <p className="body-1 max-w-3xl mx-auto text-n-2 lg:mb-8">
        EduNova is an industrial project developed for the Government of Canada by a team of passionate fourth-year Computer Science students at the University of Manitoba. Our team — <strong>Camila Martinez Ovando</strong>, <strong>Hung Lu Dao</strong>, and <strong>Dhvani Romesh Thakkar</strong> — collaborated to bring this platform to life, working across the full stack. From designing an engaging user interface to implementing robust backend logic and deploying services to the cloud, we built EduNova to support dynamic, role-based AI training in a modern, accessible way.
      </p>
    </div>
  </div>
  <BottomLine />
</Section>

    </>
  );
};

export default LandingPage;
