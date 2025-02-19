import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/HomePage.module.css';
import Header from '../Header';

const courses = [
  { id: 1, name: 'Math 1', description: 'Introduction to basic algebra and geometry.' },
  { id: 2, name: 'Math 2', description: 'Advanced topics in calculus and linear algebra.' },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [courseInput, setCourseInput] = useState('');

  const handleStartCourse = (course) => {
    navigate(`/chat/${course.id}`);
  };

  const handleAddCourse = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCourseInput('');
  };

  const handleCourseSubmit = () => {
    if (courseInput.trim()) {
      alert(`Course "${courseInput}" added!`);
      handleClosePopup();
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <h2>Courses</h2>
        <div className={styles.courseList}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <button onClick={() => handleStartCourse(course)}>Start</button>
            </div>
          ))}
        </div>
        <button className={styles.addCourseBtn} onClick={handleAddCourse}>+ Add Course</button>
      </div>
      
      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Enter Course Code</h3>
            <input
              type="text"
              value={courseInput}
              onChange={(e) => setCourseInput(e.target.value)}
              placeholder="Enter code or name"
            />
            <div className={styles.popupActions}>
              <button onClick={handleCourseSubmit}>Enter</button>
              <button onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;