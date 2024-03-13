import React from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { List } from '@mui/material'

export default function HomePage(){

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<div className='App-header'>
				{/* this one should probably just render on the page */}
				<List className='recents'>these nuts</List>

				{/* maybe put this one in a drawer anchored to the right */}
				<List className='friends'>these nuts</List>
			</div>
		</div>
		
	)
}