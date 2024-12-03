import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register_page from './components/Register_page';
import Login from './components/login';  

import Profile from './components/Profile'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Register_page" element={<Register_page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} /> {/* Add Profile Route */}
      </Routes>
    </Router>
  );
}

export default App;
