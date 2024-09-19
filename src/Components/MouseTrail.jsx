import React, { useState, useEffect, useRef } from "react";


const getRandomNeonColor = () => {
  const neonColors = [
    '#39FF14', // Neon Green
    '#FF073A', // Neon Red
    '#FF61A6', // Neon Pink
    // '#00FFFF', // Neon Cyan
    '#FF8C00', // Neon Orange
    '#9B30FF', // Neon Purple
    '#FFD700', // Neon Yellow
    '#FF1493', // Neon Deep Pink
    '#7CFC00', // Neon Lawn Green
    '#FF4500', // Neon Orange Red
  ];
  return neonColors[Math.floor(Math.random() * neonColors.length)];
};

// Function to interpolate between two colors
const interpolateColor = (startColor, endColor, factor) => {
  const [r1, g1, b1] = startColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
  const [r2, g2, b2] = endColor.match(/\w\w/g).map(hex => parseInt(hex, 16));
  
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  
  return `#${[r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
};

const Circle = ({ style }) => {
  return <div className="fixed top-0 left-0 w-6 h-6 rounded-full" style={style}></div>;
};

const MouseTrail = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [circles, setCircles] = useState(() =>
    Array.from({ length: 20 }, (_, index) => ({
      x: 0,
      y: 0,
      color: '#000000', // Initial color (will be updated on mouse move)
      scale: (20 - index) / 30, // Scale smaller circles proportionally
      speed: (20 - index) / 40 + 0.02, // Larger circles move faster, smaller circles slower
    }))
  );
  const [targetColor, setTargetColor] = useState(getRandomNeonColor()); // Target color for all circles
  const prevColor = useRef(targetColor); // Ref to store previous color
  const prevCoords = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      setTargetColor(getRandomNeonColor()); // Update target color on mouse move
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animateCircles = () => {
      setCircles((prevCircles) => {
        return prevCircles.map((circle) => {
          const newX = circle.x + (coords.x - circle.x) * circle.speed;
          const newY = circle.y + (coords.y - circle.y) * circle.speed;
          
          // Interpolate color based on the factor of time
          const factor = 0.1; // Controls the speed of the color transition
          const newColor = interpolateColor(prevColor.current, targetColor, factor);

          return {
            ...circle,
            x: newX,
            y: newY,
            color: newColor, // Smoothly transition color
          };
        });
      });

      prevCoords.current = coords;
      prevColor.current = interpolateColor(prevColor.current, targetColor, 0.1); // Update the previous color for interpolation
      requestRef.current = requestAnimationFrame(animateCircles);
    };

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, [coords, targetColor]);

  return (
    <>
      {circles.map((circle, index) => (
        <Circle
          key={index}
          style={{
            left: `${circle.x}px`,
            top: `${circle.y}px`,
            backgroundColor: circle.color,
            transform: `scale(${circle.scale})`,
            pointerEvents: "none", // Ensure it doesn't block clicks
            zIndex: 99999999, // Keep circles on top
          }}
        />
      ))}
    </>
  );
};

export default MouseTrail;
