import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { edunova } from "../../assets";
import { navigation } from "../../constants";
import Button from "../design/Button";
import MenuSvg from "../../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import { useState, useEffect } from "react";
import ButtonGradient from "../../assets/svg/ButtonGradient";
import { ArrowLeft } from "lucide-react";

const HeaderForms = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = [
        { id: "hero", threshold: 0.5 },
      ];
      
      const scrollPosition = window.scrollY + 100; // Adding offset for header height
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionTop = offsetTop;
          const sectionBottom = offsetTop + offsetHeight;
          
          // Calculate visible percentage
          const visibleTop = Math.max(0, scrollPosition - sectionTop);
          const visibleBottom = Math.min(offsetHeight, scrollPosition + windowHeight - sectionTop);
          const visibleHeight = visibleBottom - visibleTop;
          const visibleRatio = visibleHeight / offsetHeight;

          if (visibleRatio >= section.threshold) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling]);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const scrollToSection = (sectionId) => {
    setIsScrolling(true);
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header height
        behavior: "smooth"
      });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const handleNavigationClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
    if (openNavigation) {
      enablePageScroll();
      setOpenNavigation(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4 relative">
        <button 
          className="absolute left-5 lg:left-7.5 xl:left-10 flex items-center justify-center w-8 h-8"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-5 h-5 text-n-1" />
        </button>

        <div className="flex-1 flex justify-center">
          <a className="block w-[12rem]" href="#hero">
            <img src={edunova} width={190} height={40} alt="EduNova" />
          </a>
        </div>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {/* Navigation items removed */}
          </div>

          <HamburgerMenu />
        </nav>

        <ButtonGradient />

        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default HeaderForms;