import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import StarterComponent from './components/StarterComponent';
import AnimatedComponent from './components/AnimatedComponent';
import Login from './components/login';

export default function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          {/* Place future route endpoints in here as a new Route */}
          <Route path="/home" element={<StarterComponent/>} />
          <Route path="/" element={<AnimatedComponent/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}