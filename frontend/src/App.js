import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import StarterComponent from './components/StarterComponent';
import AnimatedComponent from './components/AnimatedComponent';

function App() {
  return (
    <Router>
      <Routes>
        {/* Place future route endpoints in here as a new Route */}
        <Route path="/home" element={<StarterComponent/>} />
        <Route path="/" element={<AnimatedComponent/>}/>
      </Routes>
    </Router>
  );
}

export default App;