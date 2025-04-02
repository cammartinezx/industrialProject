

import Arrow from "../../assets/svg/Arrow.jsx";
import { Link, useParams } from "react-router-dom";
import { cardbg, chat, check, download } from "../../assets/index.js";
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


export const fetchName = async (user_id) => {
  try {
    const response = await axios.post(`${url}/user/get-name`, { user_id: user_id });
    return response.data;  
  } catch (error) {
    console.error("Error fetching user name:", error);
    throw new Error("Failed to fetch user name");
  }
};


export const downloadFile = async ( courseId, fileName) => {

  try {
    // Request a signed download URL from your backend
    const res = await axios.get(`${url}/s3Url-download`, {
      params: { fileName:`${courseId}/${fileName}`},
    });

    const downloadURL = res.data.urlS3?.downloadURL;
    
    if (!downloadURL) {
      throw new Error("Failed to retrieve the file URL.");
    }

    console.log("Download URL:", downloadURL);

    // Open the file in a new tab
    window.open(downloadURL, "_blank");
    
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download material.");
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
        className="block relative bg-no-repeat bg-[length:100%_100%] w-full sm:max-w-[60%] md:max-w-[90rem] mx-auto parent-hover-container" // Added class
        style={{
          backgroundImage: `url(${
            index % 2 === 0
              ? "src/assets/course_cards/card-1.svg"
              : "src/assets/course_cards/card-2.svg"
          })`,
        }}
      >
        {/* Parent hover effect - always active when hovering parent or children */}
        <div className="absolute inset-0 z-0 parent-hover-effect opacity-0 transition-opacity duration-300">
          <img src={cardbg} width={380} height={362} className="w-full h-full object-cover" alt="card background" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-4">
          <div className="flex justify-between items-center w-full">
            <h5 className="h5 mt-7 mb-2">
              <span className="font-extrabold">Unit {index + 1} </span>
              <span className="ml-3">{unit}</span>
            </h5>

            {/* Children with independent hover effects */}
            <div className="flex items-center space-x-10">
              {/* Download Icon with Tooltip */}
              <div className="relative group">
                <img 
                  src={download} 
                  width={30} 
                  height={30} 
                  className="cursor-pointer hover:opacity-90 transition-opacity" 
                  onClick={() => downloadFile(courseId, unit)}
                />
                <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity">
                  Download
                </span>
              </div>

              <Link 
                to={`/chat/${courseId}/unit/${index+1}`} 
                className="relative group"
              >
                <img 
                  src={chat} 
                  width={30} 
                  height={40} 
                  className="cursor-pointer hover:opacity-90 transition-opacity"  
                />
                <span className="absolute left-1/2 -top-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-xs rounded px-2 py-1 transition-opacity">
                  Chat
                </span>
              </Link>
            </div>
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
