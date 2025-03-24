const Button2Svg = ({ white }) => (
  <svg
    className="absolute top-0 left-0 w-full h-full"
    viewBox="0 0 100 44"
    preserveAspectRatio="none"
  >
    <rect
      width="100"
      height="44"
      fill={white ? "#FFFFFF" : "transparent"} // Ensures white background when needed
      stroke={white ? "#FFFFFF" : "url(#btn-border)"} // Border styling
      strokeWidth="2"
      rx="8"  
      ry="8"  
    />
  </svg>
);

export default Button2Svg;