import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import '../styles/WelcomeSection.css';
import bgVideo from '../assets/bg_video.mp4';

function WelcomeSection() {
  const navigate = useNavigate();
  
  // Animation for mouse swipe effect
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 350, friction: 40 },
  }));

  // Animation for the welcome sign
  const signAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize mouse position to create subtle movement
    const moveX = ((clientX / innerWidth) - 0.5) * 50;
    const moveY = ((clientY / innerHeight) - 0.5) * 50;
    api.start({ x: moveX, y: moveY });
  };

  // Fade in animation for the buttons
  const buttonAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 800 },
  });

  return (
    <div className="welcome-container" onMouseMove={handleMouseMove}>
      <animated.video
        className="background-video"
        autoPlay
        loop
        muted
        playsInline
        style={{
          transform: x.to((val) => `translate(${val}px, ${y}px)`),
        }}
      >
        <source src={bgVideo} type="video/mp4" />
      </animated.video>
      <div className="mist-overlay" />
      <animated.h1
        className="welcome-sign"
        style={signAnimation}
      >
        Welcome to Shot Analyzer
      </animated.h1>
      <div className="button-container">
        <animated.button
          className="enter-button"
          style={buttonAnimation}
          onClick={() => navigate('/home')}
        >
          Enter Shot Analyzer
        </animated.button>
        <animated.button
          className="enter-button tutorial-button"
          style={buttonAnimation}
          onClick={() => navigate('/tutorial')}
        >
          Learn to Shoot
        </animated.button>
      </div>
    </div>
  );
}

export default WelcomeSection;