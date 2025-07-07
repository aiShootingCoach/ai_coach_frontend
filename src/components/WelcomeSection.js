import React from 'react';
import { motion } from 'framer-motion';
import '../styles/WelcomeSection.css';

function WelcomeSection() {
  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' },
  };

  return (
    <motion.div className="welcome-section" {...animationProps}>
      <h2>Welcome to Shot Analyzer</h2>
      <p>
        Elevate your basketball game with our cutting-edge shot analysis tool! Upload a video of your basketball shot, and our advanced system will break down your technique into key stages, providing personalized feedback to help you improve. Whether you're a beginner or a seasoned player, Shot Analyzer offers actionable insights to perfect your form and boost your performance.
      </p>
      <p className="invite-text">
        Ready to take your shot to the next level? Upload your video below and start your journey to a better game!
      </p>
    </motion.div>
  );
}

export default WelcomeSection;