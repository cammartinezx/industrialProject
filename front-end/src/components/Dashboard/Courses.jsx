import {url, cardDesign } from "../../constants";
import Arrow from "../../assets/svg/Arrow";
import { GradientLight } from "../design/Benefits";
import ClipPath from "../../assets/svg/ClipPath";
import { cardbg,} from "../../assets";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import Section from "../design/Section";
import Button from "../design/Button";
import CreateCourseDialog from "./CreateCourseDialog";
import JoinCourseForm from "./JoinCourseForm";

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

const Courses = () => {
  const location = useLocation();
  const userId = location.state?.userId || localStorage.getItem("userId");
  const role = location.state?.role || localStorage.getItem("role");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  

  useEffect(() => {
    if (userId) {
      fetchUserCourses();
    }
  }, [userId, role]);

  const fetchUserCourses = async () => {
    try {
      setLoading(true);
      let response, courseIds;

      if (role === "instructor") {
        response = await axios.get(`${url}/instructor/${userId}/courses-taught`);
        courseIds = response.data.courses_taught || [];  

      } else {
        response = await axios.get(`${url}/student/${userId}/courses`);
        courseIds = response.data.courses_enrolled || [];
       
      }
     
      const coursePromises = courseIds.map((id) => fetchCourseById(id));
      const detailedCourses = await Promise.all(coursePromises);
      console.log(detailedCourses);
      setCourses(detailedCourses);
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error fetching courses";
      setError(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCourseCreated = () => {
    // Refresh the course list
    fetchUserCourses();
  };

  let content, nextPage;
  if (role === "instructor") {
    nextPage=`/manage-course`;
   } else {
     nextPage=`/course`;
   }

  if (loading) {
    content = (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-gray-500 text-center">Loading courses...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl text-red-500 text-center">{error}</p>
      </div>
    );
 
  } else {
    content = (
      <div className="flex flex-wrap gap-10 mb-10n">
        {courses.map((item) => (
          <div
            className="group block relative p-5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
            
            key={item.course.course_id}
          >
            <div className="relative z-2 flex flex-col min-h-[22rem]">
              <h5 className="h5 mt-8 mb-5">{item.course.title || 'Course Title'}</h5>
              <p className="body-2 mb-6 text-n-3">{item.course.description || 'No description available.'}</p>

              <div className="flex items-center mt-auto">
                <img src={cardDesign[0]} width={48} height={48} alt={item.course.title} />
                <Link
          to={`${nextPage}/${item.course.course_id}`}  // Updated this line
          className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider"
        >
          Continue
        </Link>
                <Arrow />
              </div>
            </div>

            <GradientLight />

            <div
              className="absolute inset-0.5 bg-n-8"
              style={{ clipPath: '' }}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-25">
                <img
                  src={cardbg}
                  width={380}
                  height={362}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <ClipPath />
          </div>
        ))}
      </div>
    );
  }

  return (
    <Section id="features">
      <div className="container relative z-2">
        {/* Add Create Course button for instructors */}
        {role === "instructor" && (
          <div className="flex justify-end mb-6">
            <Button onClick={() => setCreateDialogOpen(true)}>
              Create New Course
            </Button>
          </div>
        )}
        
        {/* Add Join Course form for students */}
        {role === "student" && (
          <JoinCourseForm 
            userId={userId} 
            onCourseJoined={fetchUserCourses} 
          />
        )}
        
        {content}
        
        {/* Create Course Dialog */}
        {role === "instructor" && (
          <CreateCourseDialog 
            open={createDialogOpen} 
            setOpen={setCreateDialogOpen} 
            instructorId={userId}
            onCourseCreated={handleCourseCreated}
          />
        )}
      </div>
    </Section>
  );
};

export default Courses;


