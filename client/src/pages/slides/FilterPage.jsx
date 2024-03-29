import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import '../../css/filterpage.css';
import { useLocation } from 'react-router-dom';
import ipaddress from '../../../port';

import image1 from '../../resources/image1.jpg'
import image2 from '../../resources/image2.jpg'
import image3 from '../../resources/image3.jpg'
import image4 from '../../resources/image4.jpg'
import image5 from '../../resources/image5.jpg'

const BlankSlide = () => (
  <div>
    <h3></h3>
  </div>
);


const FilterPage = ({ match }) => {
  //style
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const style = queryParams.get('style'); 
  const eventId = sessionStorage.getItem('eventId');
  //tab
  const [activeTab, setActiveTab] = useState('tab1');
  const [studentData, setStudentData] = useState([]);
  const [isdata, setisdata] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg)'); // Set your default background image URL here
  

  // Slider settings
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Hide the arrows on the display
    // Enable variable width for better arrow key navigation
    swipeToSlide: true, // Enable swiping to navigate slides
    // draggable: true, // Enable dragging to navigate slides
    keyboard: true, // Enable keyboard navigation
  };

 
  const tabBackgroundImages = {
    tab1: `url(${image1})`,
    tab2: `url(${image2})`, // Change to your image URL
    tab3: `url(${image3})`,// Change to your image URL
    tab4: `url(${image4})`,// Change to your image URL
    tab5: `url(${image5})`, // Change to your image URL
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
        const response = await axios.get(`http://${ipaddress}/students/${eventId}`);
        if (response.data !== null){
          setisdata(true);
          setStudentData(response.data);
        }
        
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [isdata]);


  
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
          All Students
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          className={activeTab === 'tab2' ? 'active' : ''}
        >
          Good Progress
        </button>
        <button
          onClick={() => setActiveTab('tab3')}
          className={activeTab === 'tab3' ? 'active' : ''}
        >
         Director List Year 1
        </button>
        <button
          onClick={() => setActiveTab('tab4')}
          className={activeTab === 'tab4' ? 'active' : ''}
        >
          Director List Year 2
        </button>
        <button
          onClick={() => setActiveTab('tab5')}
          className={activeTab === 'tab5' ? 'active' : ''}
        >
          Director List Year 3
        </button>
      </div>
      </div>
      <div className="tab-content">
        {activeTab === 'tab1' && (
          <div>
            <h2>All Students</h2>
            <h3>Students Award</h3>
            
            {studentData.length > 0 ? (
              <Slider {...sliderSettings}>
                <div><h3>All Students</h3></div>
                {isdata !== false && studentData.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <h3>{student.AdmNo}</h3>
                    <br></br>
                    {/* Add more student data here */}
                  </div>
                ))}
                <BlankSlide />
              </Slider>
            ) : (
              <p>No students data is found.</p>
            )}
          </div>
        )}
        {activeTab === 'tab2' && (
          <div>
            <h2>Good Progress</h2>
            <h3>Students with "Good Progress" Award</h3>
            {studentsWithGoodProgress.length > 0 ? (
              <Slider {...sliderSettings}>
                {/* CoverSlide */}
                <div><h3>Good Progress</h3></div>
                {isdata !== false && studentsWithGoodProgress.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <h3>{student.AdmNo}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
                {/* Add a blank slide */}
              <BlankSlide />
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
                <div><h3>Director List Year 1</h3></div>
                {isdata !== false && studentsDir1.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <h3>{student.AdmNo}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
                <BlankSlide />
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
                 <div><h3>Director List Year 2</h3></div>
                {isdata !== false && studentsDir2.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <h3>{student.AdmNo}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
                <BlankSlide />
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
                 <div><h3>Director List Year 3</h3></div>
                {isdata !== false && studentsDir3.map((student, index) => (
                  <div key={index}>
                    <h3>{student.FullName}</h3>
                    <h3>{student.AdmNo}</h3>
                    {/* Add more student data here */}
                  </div>
                ))}
                <BlankSlide />
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
