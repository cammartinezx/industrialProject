import { useState } from "react";
import { cardbg, chat, download } from "../../assets";

const UnitCard = ({ unit, index, courseId }) => {
  const [hovered, setHovered] = useState(false); // Track if ANY icon is hovered
  const [hoverDownload, setHoverDownload] = useState(false);
  const [hoverChat, setHoverChat] = useState(false);

  return (
    <div
      className="block relative bg-no-repeat bg-[length:100%_100%] w-full sm:max-w-[60%] md:max-w-[90rem] mx-auto"
      style={{
        backgroundImage: `url(${
          index % 2 === 0
            ? "src/assets/course_cards/card-1.svg"
            : "src/assets/course_cards/card-2.svg"
        })`,
      }}
    >
      <div className="flex justify-between items-center w-full px-6 py-4">
        <h5 className="h5 mt-7 mb-2">
          <span className="font-extrabold">Unit {index + 1} </span>
          <span className="ml-3">{unit}</span>
        </h5>

        {/* ICONS */}
        <div
          className="flex items-center space-x-10"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Download Icon with Tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setHoverDownload(true)}
            onMouseLeave={() => setHoverDownload(false)}
          >
            <img src={download} width={25} height={25} className="cursor-pointer" />
            {hoverDownload && (
              <span className="absolute left-1/2 -top-8 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
                Download
              </span>
            )}
          </div>

          {/* Chat Icon with Tooltip */}
          <div
            className="relative"
            onMouseEnter={() => setHoverChat(true)}
            onMouseLeave={() => setHoverChat(false)}
          >
            <Link to={`/chat/${courseId}/unit/${index + 1}`}>
              <img src={chat} width={30} height={40} className="cursor-pointer" />
            </Link>
            {hoverChat && (
              <span className="absolute left-1/2 -top-8 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1">
                Start Chat
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BACKGROUND EFFECT - activates when ANY icon is hovered */}
      <div
        className={`absolute inset-0.5 transition-opacity duration-300 ${
          hovered ? "opacity-25" : "opacity-0"
        }`}
        style={{ clipPath: "url(#benefits)" }}
      >
        <img
          src={cardbg}
          width={380}
          height={362}
          className="w-full h-full object-cover"
          alt="card background"
        />
      </div>
    </div>
  );
};

export default UnitCard;
