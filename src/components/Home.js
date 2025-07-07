import React, { useState, useRef } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { MdVideocam, MdGesture, MdSend, MdFollowTheSigns } from 'react-icons/md';
import { useSpring, animated } from '@react-spring/web';
import '../styles/Home.css';
import SectionWrapper from './SectionWrapper';
import WelcomeSection from './WelcomeSection'; // Import the new component

function Home() {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const fileInputRef = useRef(null);

  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

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

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please provide a video file');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/uploadfile/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to load feedback');
      }
      const data = await response.json();
      setResults(data);
      const initialExpanded = Array.isArray(data)
        ? data.reduce((acc, stage) => ({
            ...acc,
            [stage.stage]: true,
          }), {})
        : {};
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

  // Zabezpieczenie averageScore
  const averageScore =
    results && Array.isArray(results.feedback) && results.feedback.length > 0
      ? (
          results.feedback.reduce(
            (sum, stage) => sum + parseFloat(stage.result),
            0
          ) / results.feedback.length
        ).toFixed(2)
      : null;

  const stageIcons = {
    loading: <MdVideocam />,
    gather: <MdGesture />,
    release: <MdSend />,
    follow: <MdFollowTheSigns />,
  };

  const getScoreColorClass = (score) => {
    const scoreValue = parseFloat(score);
    if (scoreValue > 80) return 'high';
    if (scoreValue > 70) return 'medium';
    return 'low';
  };

  return (
    <animated.div className="home-container" style={backgroundAnimation}>
      {/* <WelcomeSection /> */}
      <h1>Analyse your shot</h1>
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
              ref={fileInputRef}
              className="hidden-file-input"
            />
            <button
              type="button"
              className="custom-file-button"
              onClick={handleButtonClick}
            >
              {file ? file.name : 'Choose Video File'}
            </button>
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {averageScore && (
          <div className="score-display">
            <h3>Overall Similarity Score</h3>
            <p className= {"p-" + getScoreColorClass(averageScore)} >{Math.trunc(averageScore)} OVR</p>
          </div>
        )}
      </div>
      {results && Array.isArray(results.feedback) && Array.isArray(results.frames) && (
        <div className="results-section">
          <h2>Analysis Results</h2>
          {["loading", "gather", "release", "follow"].map((stageKey, idx) => {
            const stageData = results.feedback.find(
              (stage) => stage.stage === stageKey
            );
            if (!stageData) return null;
            const stageName =
              stageKey === "follow"
                ? "Follow-Thru"
                : stageKey.charAt(0).toUpperCase() + stageKey.slice(1);
            const isExpanded = expandedSections[stageKey];
            const colorClass = getScoreColorClass(stageData.result);
            const colorClassRecomendations = "header-content-" + colorClass;
            const frame = results.frames[idx] || results.frames[0]; 

            return (
              <div className="recommendation-section" key={stageKey}>
                <div
                  className="recommendation-header"
                  onClick={() => toggleSection(stageKey)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && toggleSection(stageKey)}
                >
                  <div className={colorClassRecomendations}>
                    <span>{stageIcons[stageKey]}</span>
                    <h3>{stageName}</h3>
                  </div>
                  {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
                </div>
                {isExpanded && (
                  <div className="recommendation-content">
                    <div className="feedback-container">
                      <div className="progress-bar">
                        <div
                          className={`progress-fill ${colorClass}`}
                          style={{ width: `${stageData.result}%` }}
                        ></div>
                      </div>
                      <p className={`similarity-text ${colorClass}`}>
                        Similarity: {Math.trunc(stageData.result)} OVR
                      </p>
                      {stageData.feedback &&
                        Object.entries(stageData.feedback).map(
                          ([feature, feedbackArr], idx) => (
                            <div className="feedback-item" key={feature + idx}>
                              <strong className={colorClass}>
                                {feature.replace(/_/g, " ")}:
                              </strong>
                              <ul>
                                {feedbackArr.map((msg, i) => (
                                  <li key={i}>{msg}</li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                    </div>
                    {console.log(frame[0])}
                    <img
                      src={`data:image/jpeg;base64,${frame[0]}`}
                      alt={`${stageName} frame`}
                      className="stage-frame"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </animated.div>
  );
}

export default Home;