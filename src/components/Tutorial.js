import React, { useEffect, useRef } from 'react';
import { useSpring, animated, useTrail } from '@react-spring/web';
import '../styles/Tutorial.css';

function Tutorial() {
  // Background fade-in animation
  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  // Refs for scroll-based animations
  const sectionsRef = useRef([]);

  // Tutorial sections data
  const sections = [
    {
      title: 'I. The Foundation: Stance and Balance',
      content: (
        <>
          <p>Before you even touch the ball, your stance sets the stage for everything that follows.</p>
          <h3>Footwork and Base</h3>
          <ul>
            <li><strong>Shoulder-Width Apart:</strong> Stand with your feet approximately shoulder-width apart for a stable base to generate power.</li>
            <li><strong>Staggered Stance (Optional):</strong> For right-handed shooters, place your right foot slightly ahead of your left (vice-versa for left-handed shooters) to align with the basket.</li>
            <li><strong>Slight Bend in Knees and Hips:</strong> Maintain an athletic bend to stay ready for an explosive jump and absorb impact on landing.</li>
            <li><strong>Common Mistake:</strong> Severely straight hips/knees create an unstable base, reducing power.</li>
            <li><strong>Correction:</strong> Bend hips and knees significantly for a balanced, athletic stance.</li>
            <li><strong>Balance:</strong> Distribute weight evenly on the balls of your feet, avoiding leaning too far forward or backward.</li>
          </ul>
          <h3>Body Alignment</h3>
          <ul>
            <li><strong>Square to the Basket (Beginners):</strong> Keep shoulders and hips relatively square to the basket.</li>
            <li><strong>Slight Turn (Advanced):</strong> A slight turn (e.g., right-handed shooter turning left) can improve comfort and alignment, with the shooting elbow aligned with the basket.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'II. The Setup: Loading the Ball',
      content: (
        <>
          <p>This stage focuses on positioning the ball for a fluid shot.</p>
          <h3>Ball Placement</h3>
          <ul>
            <li><strong>Start at Chest/Waist:</strong> Hold the ball comfortably at chest or waist level, depending on shot type (set shot or jump shot).</li>
            <li><strong>Fingertips on the Ball:</strong> Spread your shooting hand fingertips on the ball, with the palm slightly off. The guide hand rests lightly on the side for support.</li>
            <li><strong>Shooting Hand Under the Ball:</strong> Ensure the shooting hand is primarily under the ball, not gripping from the side.</li>
          </ul>
          <h3>Key Joint Angles</h3>
          <ul>
            <li><strong>Right Elbow Angle:</strong> Avoid severely extended or excessively bent elbows. Bend the elbow to keep the ball at chest level for fluid motion.</li>
            <li><strong>Right Wrist Angle:</strong> Maintain a neutral wrist to align the ball properly, avoiding rigid or overly flexed positions.</li>
            <li><strong>Right Shoulder Angle:</strong> Keep the shoulder neither too raised nor too low to position the ball correctly at chest level.</li>
            <li><strong>Left Elbow Angle (Guide Hand):</strong> Bend the guide elbow to stabilize the ball without interfering with the shooting hand.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'III. The Ascent: The Gather',
      content: (
        <>
          <p>The gather is the smooth transition from your loaded stance to the upward motion of your shot.</p>
          <h3>Fluidity and Rhythm</h3>
          <ul>
            <li><strong>Lower Body First:</strong> Initiate the gather by pushing off the ground with your legs for power.</li>
            <li><strong>Synchronized Movement:</strong> Ensure your upper body and shooting arm rise in sync with your lower body, avoiding a "two-motion" shot.</li>
            <li><strong>Elbow Tuck:</strong> Keep the shooting elbow tucked in and aligned with the basket to avoid "chicken wing."</li>
            <li><strong>Common Mistake:</strong> Flared elbow reduces shot accuracy due to misalignment.</li>
            <li><strong>Correction:</strong> Tuck elbow in for proper alignment with the basket.</li>
          </ul>
          <h3>Joint Actions</h3>
          <ul>
            <li><strong>Right Hip and Knee Angles:</strong> Maintain significant hip/knee bend for balanced transition, avoiding premature or delayed extension.</li>
            <li><strong>Right Wrist Angle:</strong> Keep a neutral wrist for proper grip and ball control.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'IV. The Release: The Apex of Your Shot',
      content: (
        <>
          <p>The release is the moment the ball leaves your fingertips.</p>
          <h3>High Release Point</h3>
          <ul>
            <li><strong>Extend Upwards:</strong> Push off the balls of your feet and extend your body upward for a high release point, making the shot harder to block.</li>
            <li><strong>Elbow Above Eye:</strong> Position the shooting elbow above your eye, pointing towards the basket.</li>
            <li><strong>Guide Hand Off:</strong> Ensure the guide hand comes off the ball completely during release to avoid interference.</li>
            <li><strong>Common Mistake:</strong> Extended guide elbow causes thumb flick, disrupting trajectory.</li>
            <li><strong>Correction:</strong> Relax guide elbow to avoid interference.</li>
          </ul>
          <h3>Wrist Snap and Finger Roll</h3>
          <ul>
            <li><strong>Strong Wrist Snap:</strong> Snap your wrist forward for backspin and arc, avoiding insufficient or excessive snaps.</li>
            <li><strong>Index and Middle Finger Last:</strong> The ball should roll off your index and middle fingers for direction and touch.</li>
          </ul>
          <h3>Key Joint Actions at Release</h3>
          <ul>
            <li><strong>Right Elbow Angle:</strong> Maintain a significant bend for a higher release, fully extending at the moment of release for power.</li>
            <li><strong>Right Hip and Knee Angles:</strong> Fully extend hips and knees for maximum jump power and elevation.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'V. The Finish: Follow Through',
      content: (
        <>
          <p>The follow-through ensures consistency and accuracy.</p>
          <h3>Hold Your Form</h3>
          <ul>
            <li><strong>"Hand in the Cookie Jar":</strong> Keep your shooting hand extended towards the basket after release, as if reaching into a cookie jar.</li>
            <li><strong>Hold Until Ball Hits Rim:</strong> Maintain the follow-through until the ball hits the rim or goes through the net.</li>
            <li><strong>Fingers Pointing Down:</strong> Ensure fingers point downward, indicating a complete wrist snap.</li>
          </ul>
          <h3>Balance on Landing</h3>
          <ul>
            <li><strong>Soft Landing:</strong> Land softly on the balls of your feet, maintaining balance and avoiding excessive drifting.</li>
            <li><strong>Common Mistake:</strong> Overextended hips/knees cause balance loss on landing.</li>
            <li><strong>Correction:</strong> Extend hips/knees fully but maintain balance for a stable landing.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'VI. Beyond the Mechanics: Mental Aspects & Practice',
      content: (
        <>
          <p>Technical form is essential, but mental preparation and practice are equally important.</p>
          <h3>Eye on the Target</h3>
          <ul>
            <li><strong>Focus on the Rim:</strong> Consistently aim for a specific spot on the rim (front, back, or middle).</li>
          </ul>
          <h3>Repetition and Muscle Memory</h3>
          <ul>
            <li><strong>Practice, Practice, Practice:</strong> Consistent, deliberate practice is key to mastering your shot.</li>
            <li><strong>Form Shooting:</strong> Start close to the basket without jumping, focusing on perfect form, then increase distance.</li>
            <li><strong>Game Speed:</strong> Practice shots at game speed and under pressure once comfortable with form.</li>
          </ul>
          <h3>Confidence</h3>
          <ul>
            <li><strong>Positive Self-Talk:</strong> Believe in your shot to boost performance.</li>
            <li><strong>Visualization:</strong> Visualize the ball going through the net before shooting.</li>
          </ul>
        </>
      ),
    },
  ];

  // Trail animation for section headers
  const trail = useTrail(sections.length, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { mass: 1, tension: 280, friction: 60 },
    delay: 200,
  });

  // Scroll-based animation for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <animated.div className="tutorial-container" style={backgroundAnimation}>
      <h1>How to Shoot a Basketball</h1>
      {trail.map((style, index) => (
        <animated.div
          key={sections[index].title}
          className="tutorial-section"
          style={style}
          ref={(el) => (sectionsRef.current[index] = el)}
        >
          <h2>{sections[index].title}</h2>
          {sections[index].content}
        </animated.div>
      ))}
    </animated.div>
  );
}

export default Tutorial;