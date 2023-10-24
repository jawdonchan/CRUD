import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import '../css/transition.css';

function App() {
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8800/student').then((response) => {
      setStudents(response.data);
    });
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % students.length);
  };

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className="App">
      <header className="App-header">
        {students.length > 0 ? ( // Check if students array is not empty
          <TransitionGroup className="slide-show">
            <CSSTransition
              key={students[currentIndex].id}
              timeout={500}
              classNames="slide"
            >
              <animated.h1 style={springProps}>
                {students[currentIndex].FullName}
              </animated.h1>
            </CSSTransition>
          </TransitionGroup>
        ) : (
          <p>Loading student data...</p>
        )}
        <br></br><br></br><br></br><br></br>
        <button onClick={nextSlide}>Next</button>
      </header>
    </div>
  );
}

export default App;
