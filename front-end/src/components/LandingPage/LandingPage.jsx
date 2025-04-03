import { curve, heroBackground, robot } from "../../assets";
import Button from "../design/Button";
import Generating from "../design/Generating";
import Notification from "../design/Notification";
import { BackgroundCircles, BottomLine, Gradient } from "../design/LandingPageDesign";
import { landingPageIcons } from "../../constants";
import { ScrollParallax } from "react-just-parallax";
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
              Learn Anything, Anytime with {` `}
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
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
            <h2 className="h2 mb-6">Discover Our Features</h2>
            <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              Experience cutting-edge learning with our AI-powered platform designed to adapt to your needs
            </p>
          </div>

          <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
            <div className="relative z-1 p-0.5 rounded-2xl bg-conic-gradient">
              <div className="relative bg-n-8 rounded-[1rem]">
                <div className="aspect-[33/40] rounded-2xl overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                  <img
                    src={robot}
                    className="w-full h-full object-cover"
                    width={1024}
                    height={490}
                    alt="AI Features"
                  />

                  <Generating className="absolute left-4 right-4 bottom-5 md:left-1/2 md:right-auto md:bottom-8 md:w-[31rem] md:-translate-x-1/2" />

                  <ScrollParallax isAbsolutelyPositioned>
                    <ul className="hidden absolute -left-[5.5rem] bottom-[7.5rem] px-1 py-1 bg-n-9/40 backdrop-blur border border-n-1/10 rounded-2xl xl:flex">
                      {landingPageIcons.map((icon, index) => (
                        <li className="p-5" key={index}>
                          <img src={icon} width={24} height={25} alt={icon} />
                        </li>
                      ))}
                    </ul>
                  </ScrollParallax>

                  <ScrollParallax isAbsolutelyPositioned>
                    <Notification
                      className="hidden absolute -right-[5.5rem] bottom-[11rem] w-[20rem] xl:flex"
                      title="Explore all our features!"
                    />
                  </ScrollParallax>
                </div>
              </div>
              <Gradient />
            </div>
            <BackgroundCircles />
          </div>
        </div>
        <BottomLine />
      </Section>

      {/* About Us Section */}
      <Section id="about" className="pt-[6rem] -mt-[2.25rem] pb-[4rem]">
        <div className="container">
          <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb-[6rem]">
            <h2 className="h2 mb-6">About Us</h2>
            <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
              This is a project for the Government of Canada made by 3 fourth year computer science students. (Need to add more stuff here!!)
            </p>
          </div>
        </div>
        <BottomLine />
      </Section>
    </>
  );
};

export default LandingPage;