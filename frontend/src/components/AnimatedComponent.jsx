import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Button } from '@mui/material'
import SideBar from './sidebar'

// another way to make a component/element
export default function AnimatedComponent(props){

	//semicolons are not needed in ReactJS, only use them if it yells at you

	//use this to add something to the state
	const [someState, setSomeState] = useState([])

	const logo = '/BeatBlendr_Logos/Full_Color_Dark.png'

	//this is an event handler, it'll trigger whenever the button is pressed
	// bc it is specified in its "onClick" trigger
	const handleButtonClick = () => {
		alert('Hello')
	}

	useEffect(() =>{
		//something in here will happen as soon as this component is rendered
		setSomeState('deeznuts')
	}, [])


	//rendered parts of the component go in this return statement.
	return (
		<div className="App">
			{/* <SideBar></SideBar> */}
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>Edit <code>src/App.js</code> and save to reload.</p>
				<p>Try the endpoint "/home"!</p>
				<Button onClick={handleButtonClick}>
                    Click Me!
				</Button>
			</header>
		</div>
	)
}