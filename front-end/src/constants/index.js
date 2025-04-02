export const url = "http://localhost:3001"

import {

  cardbg,
  chromecast,
  disc02,
  file02,
  homeSmile,

  messagePurple,

  plusSquare,
  recording01,
  recording03,
  searchMd,
  sliders04,

} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Courses",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "About Us",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "Sign Up",
    url: "#signup",

  },
  {
    id: "5",
    title: "Log in",
    url: "#login",

  },
];

export const navigationStudent = [
  {
    id: "0",
    title: "Dashboard",
    url: "#features",
  },
  {
    id: "1",
    title: "Progress",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Profile",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Notifications",
    url: "#roadmap",
  },

  {
    id: "5",
    title: "Log out",
    url: "#login",
    onlyMobile: true,
  },
];

export const navigationChatStudent = [
  {
    id: "0",
    title: "Back to Course",
    url: "/course",
  },
  
  
  {
    id: "1",
    title: "Unit 1",
    url: "#features",
  },

  {
    id: "2",
    title: "Save Session",
    url: "#login",

  },
];

export const navigationCourseStudent = [
  {
    id: "0",
    title: "Back to Course",
    url: "/course",
  },
  
  
  {
    id: "1",
    title: "Unit 1",
    url: "#features",
  },

  {
    id: "2",
    title: "Save Session",
    url: "#login",

  },
];
export const landingPageIcons = [homeSmile, file02, searchMd, plusSquare];


export const edunovaServices = [
  "Generación de fotos",
  "Mejora de fotos",
  "Integración perfecta",
];

export const edunovaServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const cardDesign = [messagePurple, cardbg];


export const majors = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Data Science",
  "Software Engineering",
  "Information Technology",
  "Business Administration",
  "Marketing",
  "Psychology",
  "Economics",
  "Physics",
  "Mathematics",
  "Biology",
  "Environmental Science",
  "Chemistry",
  "Political Science",
  "Sociology",
  "Philosophy",
  "Linguistics",
];
export const gpaOptions = [
  { value: "less_than_2", label: "Less than 2" },
  { value: "2_to_2_5", label: "2 to 2.5" },
  { value: "2_5_to_3", label: "2.5 to 3" },
  { value: "3_to_3_5", label: "3 to 3.5" },
  { value: "3_5_to_4", label: "3.5 to 4" },
  { value: "4_to_4_5", label: "4 to 4.5" },
  { value: "4_5_plus", label: "4.5+" }
];

export const locationOptions = ["Toronto", "Vancouver", "Montreal", "Calgary", "Winnipeg"];

export const languageOptions = ["English", "French"];

export const learningStyleOptions = [
  { value: "memorization", label: "Memorization" },
  { value: "graphical", label: "Graphical" },
  { value: "visual", label: "Visual" },
  { value: "repetition", label: "Repetition" },
  { value: "active_recall", label: "Active Recall" },
  { value: "hands_on", label: "Hands-on Practice" },
  { value: "auditory", label: "Auditory" }
];

export const getCourseDetails = (course) => [
  { label: "Course Code", value: course?.course_id || "N/A" },
  { label: "Total Students", value: course?.size || "N/A" },
  //{ label: "Enrolled On", value: "09/11/2024" }, // Static value
];

export const sampleCourse = {
  title: "Introduction to Artificial Intelligence",
  description: "Learn the fundamentals of AI, machine learning, and neural networks.",
  course_id: "AI101",
  instructor: "Dr. John Doe",

};

export const sampleclassList = [
  { name: "John Doe", id: "student_1" },
  { name: "Jane Smith", id: "student_2" },
  { name: "Michael Johnson", id: "student_3" },
];

export const navigationInstructor = [
  {
    id: "0",
    title: "Dashboard",
    url: "#features",
  },
  
  {
    id: "2",
    title: "Profile",
    url: "#how-to-use",
  },
 

  
];
