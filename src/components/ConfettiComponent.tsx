// components/ConfettiComponent.tsx
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [run, setRun] = useState(true); // State to control when confetti runs
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out animation

  useEffect(() => {
    // Set the dimensions only in the browser
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Update the dimensions on window resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 10 seconds and apply fade-out animation
    const confettiDuration = 10000; // Duration in milliseconds
    const timer = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out animation
      setTimeout(() => {
        setRun(false); // Remove confetti from the UI after fade-out
      }, 1000); // Match this duration with the fade-out duration
    }, confettiDuration);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer); // Cleanup timer on unmount
    };
  }, []);

  return (
    <>
      {run && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          run={run} // Start confetti
          numberOfPieces={200} // Adjust for more or fewer confetti pieces
          gravity={0.2} // Control how fast the confetti falls
          tweenDuration={5000} // Duration of falling effect
          className={`transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`} // Tailwind fade-out effect
        />
      )}
    </>
  );
};

export default ConfettiComponent;
