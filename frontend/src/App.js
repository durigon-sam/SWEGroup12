import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import StarterComponent from './components/StarterComponent';
import AnimatedComponent from './components/AnimatedComponent';

function App() {
  return (
    <Router>

      {/* Add the route for StarterComponent */}

      <Routes>
        <Route path="/home" element={<StarterComponent/>} />
        <Route path="/" element={<AnimatedComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;