// App.js or Routes.js (depending on how you have set up your routing)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import DataPage from './components/DataPage';
import LoginPage from './components/LoginPage';
import FormPage from './components/FormPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/data" element={<DataPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/" element={<LoginPage />} /> {/* Default route to login */}
      </Routes>
    </Router>
  );
};

export default App;
