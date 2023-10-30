import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';

const FilterPage = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [studentData, setStudentData] = useState([]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Fetch all student data when the component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/students');
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

  // Filter students with "Good Progress" award
  const studentsWithGoodProgress = studentData.filter((student) => student.Award === 'Good Progress');

  // Filter students with "Director List Year 1 " award
  const studentsDir1 = studentData.filter((student) => student.Award === 'Director List Year 1');
    // Filter students with "Director List Year 2 " award
  const studentsDir2 = studentData.filter((student) => student.Award === 'Director List Year 2');
  return (
    <div className="filter-page">
      <div className="tab-container">
        <button
          onClick={() => setActiveTab('tab1')}
          className={activeTab === 'tab1' ? 'active' : ''}
        >
          Tab 1
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={activeTab === 'tab2' ? 'active' : ''}
        >
          Tab 2
        </button>
        <button
          onClick={() => setActiveTab('tab3')}
          className={activeTab === 'tab3' ? 'active' : ''}
        >
          Tab 3
        </button>
        <button
          onClick={() => setActiveTab('tab4')}
          className={activeTab === 'tab4' ? 'active' : ''}
        >
          Tab 4
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <h2>Tab 1 Content with Student Data</h2>
            <h3>All Students</h3>
            {studentData.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentData.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <br></br>
                    {/* Add more student data here */}
                  </div>
                ))}
              </Slider>
            ) : (
              <p>Loading student data...</p>
            )}
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <h2>Good Progress</h2>
            <h3>Students with "Good Progress" Award</h3>
            {studentsWithGoodProgress.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentsWithGoodProgress.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No students with "Good Progress" award found.</p>
            )}
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h2>Director List Year 1</h2>
            <h3>Students with "Director List Year 1" Award</h3>
            {studentsDir1.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentsDir1.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No students with "Good Progress" award found.</p>
            )}
          </div>
        )}
        {activeTab === 'tab4' && (
          <div>
            <h2>Director List Year 2</h2>
            <h3>Students with "Director List Year 2" Award</h3>
            {studentsDir2.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentsDir2.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No students with "Good Progress" award found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
