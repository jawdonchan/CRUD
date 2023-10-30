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

  // Fetch student data when the component mounts
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/student');
        setStudentData(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, []);

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
      </div>

      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <h2>Tab 1 Content with Student Data</h2>
            {studentData.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentData.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
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
            <h2>Tab 2 Content</h2>
            {/* Add your content for Tab 2 here */}
          </div>
        )}
        {activeTab === 'tab3' && (
          <div>
            <h2>Tab 3 Content</h2>
            {/* Add your content for Tab 3 here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
