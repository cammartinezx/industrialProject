import { useLocation } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { edunova } from "../../assets";
import MenuSvg from "../../assets/svg/MenuSvg";
import { useState } from "react";
import Button from "../design/Button";
import { ArrowLeft } from "lucide-react";

const HeaderChatInstructor = () => {
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-n-8/90 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => window.history.back()} className="text-n-1 hover:text-color-1">
            <ArrowLeft size={24} />
          </button>
        </div>

        <div className="flex-1 flex justify-center">
          <a className="block w-[12rem]" href="#hero">
            <img src={edunova} width={190} height={40} alt="EduNova" />
          </a>
        </div>

        <div className="flex items-center gap-4">
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

export default HeaderChatInstructor;