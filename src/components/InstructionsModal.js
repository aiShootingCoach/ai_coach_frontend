import React, { useState } from 'react';
import '../styles/InstructionsModal.css';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

function InstructionsModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Step 1: Enter Your Details',
      content: 'Start by entering your name in the provided text field. Then, click the "Choose Video File" button to upload a video of your shot. Ensure the video is in a supported format (e.g., MP③MP4, MOV).',
    },
    {
      title: 'Step 2: Submit for Analysis',
      content: 'Once you have entered your name and selected a video, click the "Submit" button. The system will analyze your video and compare it to optimal shot techniques.',
    },
    {
      title: 'Step 3: Review Your Results',
      content: 'After processing, you will see a detailed analysis of your shot, broken down into stages (Loading, Gather, Release, Follow-Thru). Each stage includes a similarity score and specific feedback to improve your technique.',
    },
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose} aria-label="Close instructions">
          <FaTimes />
        </button>
        <h2>{pages[currentPage].title}</h2>
        <p>{pages[currentPage].content}</p>
        <div className="modal-navigation">
          <button
            className="nav-button"
            onClick={handlePrev}
            disabled={currentPage === 0}
            aria-label="Previous page"
          >
            <FaArrowLeft />
          </button>
          <span className="page-indicator">
            {currentPage + 1} / {pages.length}
          </span>
          <button
            className="nav-button"
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            aria-label="Next page"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstructionsModal;