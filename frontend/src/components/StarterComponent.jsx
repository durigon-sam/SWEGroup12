import React from 'react'
import '../styles/App.css'

//one way to make a component/element
//this is an arrow function, it is one way of creating a function in JS
const StarterComponent = () => {
	return (
		<div className='App'>
			<header className='App-header'>
				<h1>This is a starter component!</h1>
				<a 
					className='App-link'
					href='/'
				>
        Return to animation!
				</a>
			</header>
		</div>
	)
}

export default StarterComponent