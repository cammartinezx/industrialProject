

import Arrow from "../../assets/svg/Arrow.jsx";


import { Link } from "react-router-dom";
import { cardbg, check } from "../../assets/index.js";


import axios from "axios";
import { getCourseDetails, url } from "../../constants/index.js";
import { useEffect, useState } from "react";
import HeaderStudent from "../Headers/HeaderStudent.jsx";

/**
 * Fetch course details by course ID.
 * @param {string} courseId - The ID of the course to fetch.
 * @returns {Promise<object>} - The course object if successful.
 */
export const fetchCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${url}/course/${courseId}/get-course`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw new Error('Failed to fetch course details');
  }
};




  const CourseMain = () => {
    const courseId = "stat3000";
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await fetchCourseById(courseId);
          setCourse(response.course);
        } catch (err) {
          setError("Error fetching course details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  
      if (courseId) {
        fetchCourse();
      }
    }, [courseId]);
  
    if (loading) return <p className="text-center mt-20">Loading course details...</p>;
    if (error) return <p className="text-center text-red-500 mt-20">{error}</p>;
  
    return (
      <>
        <HeaderStudent />
        <div className="container relative z-2 mt-28">
  <h2 className="h2 mb-4 font-bold">{course?.title}</h2>
  <p className="body-2 mb-[1rem] text-n-3">{course?.description}</p>
  
  <ul className="body-2 flex justify-between">
    {getCourseDetails.map((detail, index) => (
      <li key={index} className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
        <img width={24} height={24} src={check} alt="check" />
        <p className="ml-4">
          <span className="font-semibold">{detail.label}:</span> {detail.value}
        </p>
      </li>
    ))}
  </ul>
</div>
  
      
      </>
    );
  };
  
  export default CourseMain;
