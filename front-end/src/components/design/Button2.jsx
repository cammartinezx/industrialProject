import React from "react";
import Button2Svg from "../../assets/svg/Button2Svg";


const Button2 = ({ className, href, onClick, children, px, white }) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;

  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick}>
      <span className={spanClasses}>{children}</span>
      <Button2Svg white={white} />
    </button>
  );

  const renderLink = () => {
    return (
      <a href={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        <Button2Svg white={white} />
      </a>
    );
  };

  return href ? renderLink() : renderButton();
};

export default Button2;