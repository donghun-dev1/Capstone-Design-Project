import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DietResult from './components/DietResult'
import MainPage from './components/MainPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diet-result" element={<DietResult />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
