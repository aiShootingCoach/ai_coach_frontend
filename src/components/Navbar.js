import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Add this import
import '../styles/Navbar.css';
import InstructionsModal from './InstructionsModal.js';
import logo from '../assets/logo.png';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button
          className="navbar-toggle"
          aria-label="Toggle navigation"
          onClick={handleLogoClick}
          style={{ background: 'none', border: 'none', boxShadow: 'none' }}
        >
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h1>Spot On Shot</h1>
        </button>
      </div>
      <button className="help-button" onClick={openModal} aria-label="Open instructions">
        <FaQuestionCircle />
      </button>
      <InstructionsModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}

export default Navbar;