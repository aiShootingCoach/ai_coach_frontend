import React, { useState } from 'react';
import '../styles/InstructionsModal.css';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

function InstructionsModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Step 1: Film Your Shot',
      content: 'To get started, film yourself taking a basketball shot. Ensure the video is clear and captures your entire shooting motion. You can use any device that records video, such as a smartphone or camera. You should position the camera at a angle of 45 degrees to your shooting side, about 10 feet away from the basket. This will help capture the full motion of your shot.',
    },
    {
      title: 'Step 2: Upload Your Video',
      content: 'After filming your shot, upload the video file using the "Choose File" button. Ensure the file is in a supported format (e.g., MP4, AVI). You can also enter your name to personalize your analysis.',
    },
    {
      title: 'Step 3: Submit for Analysis',
      content: 'Once you have entered your name and selected a video, click the "Submit" button. The system will analyze your video and compare it to optimal shot techniques.',
    },
    {
      title: 'Step 4: Review Your Results',
      content: 'After processing, you will see a detailed analysis of your shot, broken down into stages (Loading, Gather, Release, Follow-Thru). Each stage includes a similarity score and specific feedback to improve your technique.',
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.button
              className="modal-close-button"
              onClick={onClose}
              aria-label="Close instructions"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {pages[currentPage].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {pages[currentPage].content}
            </motion.p>
            <div className="modal-navigation">
              <motion.button
                className="nav-button"
                onClick={() => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length)}
                disabled={currentPage === 0}
                aria-label="Previous page"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowLeft />
              </motion.button>
              <span className="page-indicator">
                {currentPage + 1} / {pages.length}
              </span>
              <motion.button
                className="nav-button"
                onClick={() => setCurrentPage((prev) => (prev + 1) % pages.length)}
                disabled={currentPage === pages.length - 1}
                aria-label="Next page"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowRight />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default InstructionsModal;