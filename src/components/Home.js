import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'; // Icons for collapse/expand
import { MdVideocam, MdGesture, MdSend, MdFollowTheSigns } from 'react-icons/md'; // Stage-specific icons
import '../styles/Home.css';
import SectionWrapper from './SectionWrapper';

function Home() {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({}); // Track expanded state

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setError(null);
    } else {
      setError('Please select a valid video file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !userName) {
      setError('Please provide both a video file and your name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/feedback.json');
      if (!response.ok) {
        throw new Error('Failed to load feedback');
      }
      const data = await response.json();
      setResults(data);
      // Initialize all sections as expanded by default
      const initialExpanded = data.reduce((acc, stage) => ({
        ...acc,
        [stage.stage]: true,
      }), {});
      setExpandedSections(initialExpanded);
    } catch (err) {
      setError('Failed to analyze video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (stageKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [stageKey]: !prev[stageKey],
    }));
  };

  // Calculate average similarity score
  const averageScore = results
    ? (results.reduce((sum, stage) => sum + parseFloat(stage.result), 0) / results.length).toFixed(2)
    : null;

  // Map stage keys to icons
  const stageIcons = {
    loading: <MdVideocam />,
    gather: <MdGesture />,
    release: <MdSend />,
    follow: <MdFollowTheSigns />,
  };

  return (
    <div className="home-container">
      <h1>Shot Analysis Tool</h1>
      <div className="upload-section">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="userName">Enter Your Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="videoFile">Upload Video:</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {averageScore && (
          <div className="score-display">
            <h3>Overall Similarity Score</h3>
            <p>{averageScore}%</p>
          </div>
        )}
      </div>
      {results && (
        <div className="results-section">
          <h2>Analysis Results</h2>
            {["loading", "gather", "release", "follow"].map((stageKey, idx) => {
              const stageData = results.find((stage) => stage.stage === stageKey);
              if (!stageData) return null;
              const stageName =
                stageKey === "follow"
                  ? "Follow-Thru"
                  : stageKey.charAt(0).toUpperCase() + stageKey.slice(1);
              const isExpanded = expandedSections[stageKey];

              return (
                <div className="recommendation-section" key={stageKey}>
                  <div
                    className="recommendation-header"
                    onClick={() => toggleSection(stageKey)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSection(stageKey)}
                  >
                    <div className="header-content">
                      {stageIcons[stageKey]}
                      <h3>{stageName}</h3>
                    </div>
                    {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                  </div>
                  {isExpanded && (
                    <div className="recommendation-content">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${stageData.result}%` }}
                        ></div>
                      </div>
                      <p className="similarity-text">
                        Similarity: {parseFloat(stageData.result).toFixed(2)}%
                      </p>
                      {Object.entries(stageData.feedback).map(
                        ([feature, feedbackArr], idx) => (
                          <div className="feedback-item" key={feature + idx}>
                            <strong>{feature.replace(/_/g, " ")}:</strong>
                            <ul>
                              {feedbackArr.map((msg, i) => (
                                <li key={i}>{msg}</li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Home;