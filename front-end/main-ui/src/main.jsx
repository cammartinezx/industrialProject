import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard_student from './components/Dashboard_student.jsx'
import CourseMain from './components/CourseMain.jsx'
import ChatStudent from './components/chatStudent.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard_student" element={<Dashboard_student />} />
        <Route path="/course" element={<CourseMain />} />
        <Route path="/chat" element={<ChatStudent />} />
      </Routes>
    </Router>
  </StrictMode>,
)
