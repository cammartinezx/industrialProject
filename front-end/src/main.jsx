import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import StudentCourseMain from './components/CoursePage/StudentCourseMain.jsx'

import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import StudentSignUp from './components/StudentSignUp/StudentSignUp.jsx'
import App from './components/LandingPage/App.jsx'
import InstructorSignUp from './components/InstructorSignUp.jsx/InstructorSignUp.jsx'
import InstructorCourseMain from './components/CoursePage/InstructorCourseMain.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import ChatStudent from './Chat/chatStudent.jsx'
import ChatInstructor from './Chat/chatInstructor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/instructor-signup" element={<InstructorSignUp />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-course/:courseId" element={<InstructorCourseMain />} />
        <Route path="/course/:courseId" element={<StudentCourseMain />} />
        <Route path="/chat/:courseId/unit/:unitIndex" element={<ChatStudent />} />
        <Route path="/join-chat/:courseId" element={<ChatInstructor/>} />
      </Routes>
    </Router>
  </StrictMode>,
)
