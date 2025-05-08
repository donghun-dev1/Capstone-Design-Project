import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DietSummary from './components/DietSummary';
import DietResult from './components/DietResult';

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/result" />} />
      <Route path="/result" element={<DietResult />} />
      <Route path="/summary" element={<DietSummary />} />
    </Routes>
  </Router>
);

export default App;
