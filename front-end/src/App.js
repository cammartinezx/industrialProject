import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ConversationPage from './pages/ConversationPage';

import ScrollToTop from './ScrollToTop';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {/* Public routes - Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Login Sign-up routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/chat/1" element={<ConversationPage />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
