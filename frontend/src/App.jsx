import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './styles/App.css'
import Login from './components/login'
import HomePage from './components/home'
import Search from './components/search'
import Profile from './components/profile'

export default function App() {

	let userId = localStorage.getItem('userId')

	return (
		<div className='app'>
			<Router>
				<Routes>
					{/* Place future route endpoints in here as a new Route */}
					{/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
					<Route path='/home' element={<HomePage/>} />
					<Route path='/' element={<Login/>}/>
					<Route path='/search' element={<Search/>}/>
					<Route path='/profile' element={<Profile/>}/>
				</Routes>
			</Router>
		</div>
	)
}
