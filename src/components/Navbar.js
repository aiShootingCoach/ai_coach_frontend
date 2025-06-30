import React, { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa'; // Ikona znaku zapytania
import '../styles/Navbar.css';
import InstructionsModal from './InstructionsModal.js'; // Import nowego komponentu
import logo from '../assets/logo.png';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <h1>Shot Analyzer</h1>
      </div>
      <button className="help-button" onClick={openModal} aria-label="Open instructions">
        <FaQuestionCircle />
      </button>
      <InstructionsModal isOpen={isModalOpen} onClose={closeModal} />
    </nav>
  );
}

export default Navbar;