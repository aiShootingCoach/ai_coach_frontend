import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import WelcomeSection from './components/WelcomeSection';
import Tutorial from './components/Tutorial';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<WelcomeSection />} />
          <Route path="/home" element={<><Navbar /><main className="main-content"><Home /></main></>} />
          <Route path="/tutorial" element={<><Navbar /><main className="main-content"><Tutorial /></main></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;