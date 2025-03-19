import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard_student from './components/StudentCourses/Dashboard_student.jsx'
import CourseMain from './components/StudentCourses/CourseMain.jsx'
import ChatStudent from './components/chatStudent.jsx'
import Login from './components/Login/Login.jsx'
import SignUp from './components/SignUp/SignUp.jsx'
import StudentSignUp from './components/StudentSignUp/StudentSignUp.jsx'
import App from './components/LandingPage/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student-signup" element={<StudentSignUp />} />
        <Route path="/dashboard-student" element={<Dashboard_student />} />
        <Route path="/course" element={<CourseMain />} />
        <Route path="/chat" element={<ChatStudent />} />
      </Routes>
    </Router>
  </StrictMode>,
)
