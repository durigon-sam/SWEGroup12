import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './styles/App.css'
import Login from './components/login'
import HomePage from './components/home'

export default function App() {
	return (
		<div className='app'>
			<Router>
				<Routes>
					{/* Place future route endpoints in here as a new Route */}
					<Route path='/' element={<HomePage/>} />
					<Route path='/login' element={<Login/>}/>
				</Routes>
			</Router>
		</div>
	)
}