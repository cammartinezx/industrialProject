

import Arrow from "../../assets/svg/Arrow.jsx";
import { Link, useParams } from "react-router-dom";
import { cardbg, check } from "../../assets/index.js";
import axios from "axios";
import { url } from "../../constants/index.js";
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
/**
 * Fetch the user's name by email.
 * @param {string} user_id - The email of the user to fetch the name.
 * @returns {Promise<string>} - The user's name if successful.
 */
export const fetchName = async (user_id) => {
  try {
    const response = await axios.post(`${url}/user/get-name`, { user_id: user_id });
    return response.data;  
  } catch (error) {
    console.error("Error fetching user name:", error);
    throw new Error("Failed to fetch user name");
  }
};






  const StudentCourseMain = () => {
    const { courseId } = useParams(); 
    const [course, setCourse] = useState(null);
    const [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [instructor, setInstructor] = useState("");

  
    useEffect(() => {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const response = await fetchCourseById(courseId);
          setCourse(response.course);
          const user = await fetchName(response.course.instructor);
          setInstructor(user.name);
          setUnits(response.course.unit_list || []);
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
      <div id="course-content bg-n-8/90">
        <HeaderStudent />
        <div className="container relative z-2 mt-28">
          <h2 className="h2 mb-4 font-bold">{course?.title}</h2>
          <p className="body-2 mb-[1rem] text-n-3">{course?.description}</p>
          <ul className="body-2 flex justify-between">
            <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
              <img width={24} height={24} src={check} alt="check" />
              <p className="ml-4">
                <span className="font-semibold">Course Code:</span> {course?.course_id}
              </p>
            </li>
            <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
              <img width={24} height={24} src={check} alt="check" />
              <p className="ml-4">
                <span className="font-semibold">Instructor:</span> {instructor}
              </p>
            </li>
            <li className="flex items-center py-4 border-t border-b border-n-6 flex-grow">
              <img width={24} height={24} src={check} alt="check" />
              <p className="ml-4">
                <span className="font-semibold">Enrolled On:</span> 09/11/2024
              </p>
            </li>
          </ul>
        </div>
  
        <div className="container relative z-2">
          <div className="flex flex-col gap-6 mt-10 mb-6 w-full">
            {units.map((unit, index) => (
              <div
                key={index}
                className="group block relative bg-no-repeat bg-[length:100%_100%] w-full sm:max-w-[60%] md:max-w-[90rem] mx-auto"
                style={{
                  backgroundImage: `url(${
                    index % 2 === 0
                      ? "src/assets/course_cards/card-1.svg"
                      : "src/assets/course_cards/card-2.svg"
                  })`,
                }}
              >
                <div className="flex justify-between items-center w-full px-6 py-4">
                  <h5 className="h5 mt-7 mb-2">
                    <span className="font-extrabold">Unit {index + 1} </span>
                    <span className="ml-3">{unit}</span>
                  </h5>
                  <div className="flex items-center space-x-2">
                    <Link to={`/chat/${courseId}`}  state={{ title: course?.title }}  className="z-50">
                      Start chat
                    </Link>
                    <Arrow className="w-6 h-6 text-white" />
                  </div>
                </div>
  
                <div className="absolute inset-0.5" style={{ clipPath: "url(#benefits)" }}>
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-25">
                    <img src={cardbg} width={380} height={362} className="w-full h-full object-cover" alt="card background" />
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    );
  };
  
  export default StudentCourseMain;
