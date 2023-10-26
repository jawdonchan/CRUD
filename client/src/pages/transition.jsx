import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useSpring, animated } from 'react-spring';
import axios from 'axios';
import '../css/transition.css';

function App() {
  const [students, setStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('All Students'); // Default tab

  useEffect(() => {
    axios.get('http://localhost:8800/student').then((response) => {
      setStudents(response.data);
    });
  }, []);

  // Use useRef to keep track of currentIndex
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  const filterStudentsByTab = (tabName) => {
    setActiveTab(tabName);
    // Implement filtering logic based on the selected tab
  };

  const getNextIndex = () => {
    // Calculate the next index and ensure it loops back to the beginning
    return (currentIndexRef.current + 1) % students.length;
  };

  const nextSlide = () => {
    setCurrentIndex(getNextIndex());
  };

  const filteredStudents = students.filter((student) => {
    if (activeTab === 'All Students') {
      return true;
    } 
    else if (activeTab === 'Good Progress') {
      return student['GdProgress'] === 'yes';
    }
    else if (activeTab === 'D List') {
      return student['DList'] === 'yes';
    }
    else {
      return student.year === activeTab;
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* Replace the button elements with React Router's Link elements */}
        <div className="tab-container">
          <button onClick={() => filterStudentsByTab('All Students')}>All Students</button>
          <button onClick={() => filterStudentsByTab('Good Progress')}>Good Progress</button>
          <button onClick={() => filterStudentsByTab('D List')}>D List</button>
          <button onClick={() => filterStudentsByTab('Year 2')}>Year 2</button>
          <button onClick={() => filterStudentsByTab('Year 3')}>Year 3</button>
        </div>
        {/* Replace the content here with React Router's Route and Switch components */}
        {filteredStudents.length > 0 ? (
          <TransitionGroup className="slide-show">
            <CSSTransition
              key={filteredStudents[currentIndex].id}
              timeout={500}
              classNames="slide"
            >
              <animated.h1 style={springProps}>
                {filteredStudents[currentIndex].FullName}
              </animated.h1>
            </CSSTransition>
          </TransitionGroup>
        ) : (
          <p>Loading or no matching students...</p>
        )}
        {/* Keep the button for next slide */}
        <button onClick={nextSlide}>Next</button>
      </header>
    </div>
  );
}

export default App;
