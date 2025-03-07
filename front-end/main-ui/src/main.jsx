import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard_student from './components/Dashboard_student.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        {/* Add the route for the Dashboard_student page */}
        <Route path="/dashboard_student" element={<Dashboard_student />} />
        {/* Add a default route for your app */}
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
