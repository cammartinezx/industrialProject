import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { edunova } from "../../assets";
import { navigation } from "../../constants";
import Button from "../design/Button";
import MenuSvg from "../../assets/svg/MenuSvg";
import { HamburgerMenu } from "../design/Header";
import { useState, useEffect } from "react";
import ButtonGradient from "../../assets/svg/ButtonGradient";

const Header = () => {
  const location = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = [
        { id: "hero", threshold: 0.5 },
        { id: "features", threshold: 0.5 },
        { id: "about", threshold: 0.5 }
      ];
      
      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const sectionTop = offsetTop;
          const sectionBottom = offsetTop + offsetHeight;
          
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
        top: section.offsetTop - 80,
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

  const filteredNavigation = navigation.filter(item => 
    item.title === "Features" || item.title === "About Us"
  );

  const getSectionId = (title) => {
    switch(title) {
      case "Features": return "features";
      case "About Us": return "about";
      default: return "hero";
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center">
          <a 
            className="block w-[12rem] xl:mr-8" 
            href="#hero" 
            onClick={(e) => handleNavigationClick(e, "hero")}
          >
            <img src={edunova} width={190} height={40} alt="EduNova" />
          </a>
        </div>

        <div className="flex items-center">
          <nav
            className={`${
              openNavigation ? "flex" : "hidden"
            } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
          >
            <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
              {filteredNavigation.map((item) => {
                const sectionId = getSectionId(item.title);
                const isActive = activeSection === sectionId;
                
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    onClick={(e) => handleNavigationClick(e, sectionId)}
                    className={`block relative font-code text-2xl uppercase transition-colors hover:text-color-1 ${
                      item.onlyMobile ? "lg:hidden" : ""
                    } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                      isActive
                        ? "text-color-1 lg:text-color-1 lg:bg-n-7/50 lg:rounded-lg lg:px-4 lg:py-2"
                        : "text-n-1 lg:text-n-1/50"
                    } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
                  >
                    {item.title}
                    {isActive && (
                      <span className="hidden lg:block absolute -bottom-1 left-0 right-0 h-0.5 bg-color-1" />
                    )}
                  </a>
                );
              })}
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
    </div>
  );
};

export default Header;