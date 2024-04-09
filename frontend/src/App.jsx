import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import Login from './components/login'
import HomePage from './components/home'
import Search from './components/search'
import Playlist from './components/playlist'
import Profile from './components/profile'

export default function App() {
	return (
		<div className='app'>
			<Router>
				<Routes>
					{/* Place future route endpoints in here as a new Route */}
					<Route path='/' element={<Login/>} />
					<Route path='/home' element={<HomePage/>}/>
					<Route path='/search' element={<Search/>}/>
					<Route path='/playlist' element={<Playlist/>}/>
					<Route path='/profile' element={<Profile/>}/>
				</Routes>
			</Router>
		</div>
	)
}