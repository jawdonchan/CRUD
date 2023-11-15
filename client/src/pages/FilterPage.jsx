import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import '../css/filterpage.css';
import { useLocation } from 'react-router-dom';

const FilterPage = ({ match }) => {
  //style
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const style = queryParams.get('style'); 
  //tab
  const [activeTab, setActiveTab] = useState('tab1');
  const [studentData, setStudentData] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg)'); // Set your default background image URL here
  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const tabBackgroundImages = {
    tab1: 'url(https://i.pinimg.com/originals/f3/3a/4c/f33a4c8f3506265c396565a3cc4ecf27.jpg)', // Change to your image URL
    tab2: 'url(https://i.pinimg.com/originals/c3/06/40/c306407ea7ea891e9ed4cd535911945a.jpg)', // Change to your image URL
    tab3: 'url(https://i.pinimg.com/736x/bf/73/df/bf73df24dc5eba9576213812743d230e.jpg)', // Change to your image URL
    tab4: 'url(https://i.pinimg.com/originals/d7/1d/14/d71d144c2f0c6f7baf612d09c8b9c7fa.jpg)', // Change to your image URL
    tab5: 'url(https://i.pinimg.com/originals/26/80/c9/2680c91bc126887950edd059bd8f0372.jpg)', // Change to your image URL
  };
   // Define CSS classes based on the selected style
   const cssClasses = {
    default: 'default-style',
    style1: 'style1',
    style2: 'style2',
    // Add more styles here as needed
  };

// for the mouse hovering effect @ tab
const handleTabHover = (tab) => {
  setActiveTab(tab);
};

const handleTabClick = (tab) => {
  setActiveTab(tab);
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
  //change css style
  useEffect(() => {
    // Apply the CSS class based on the selected style
    document.body.className = cssClasses[style] || cssClasses.default;
  }, [style]);
  
  // Filter students with "Good Progress" award
  const studentsWithGoodProgress = studentData.filter((student) => student.Award === 'Good Progress');

  // Filter students with "Director List Year 1 " award
  const studentsDir1 = studentData.filter((student) => student.Award === 'Director List Year 1');
    // Filter students with "Director List Year 2 " award
  const studentsDir2 = studentData.filter((student) => student.Award === 'Director List Year 2');
  // Filter students with "Director List Year 3 " award
  const studentsDir3 = studentData.filter((student) => student.Award === 'Director List Year 3');
 // change css background
  useEffect(() => {
    // Update the background image when the activeTab changes
    setBackgroundImage(tabBackgroundImages[activeTab]);
  }, [activeTab]);
  return (
    <div className="filter-page" style={{ backgroundImage }}>
      <div className="tab-container">
      <div className="tab-dropdown">
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
        <button
          onClick={() => setActiveTab('tab5')}
          className={activeTab === 'tab5' ? 'active' : ''}
        >
          Tab 5
        </button>
      </div>
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
                    <h3>{student.AdmNo}</h3>
                    <br></br><br></br>
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
              <p>No students with "Director List Year 1" award found.</p>
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
              <p>No students with "Director List Year 2" award found.</p>
            )}
          </div>
        )}
         {activeTab === 'tab5' && (
          <div>
            <h2>Director List Year 3</h2>
            <h3>Students with "Director List Year 3" Award</h3>
            {studentsDir3.length > 0 ? (
              <Slider {...sliderSettings}>
                {studentsDir3.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
              </Slider>
            ) : (
              <p>No students with "Director List Year 3" award found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
