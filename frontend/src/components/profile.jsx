import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const ME = 'https://api.spotify.com/v1/me'
const font = './LibreFranklin-VariableFont_wght.ttf'

export default function Profile () {

	const [name, setName] = useState(null)
	const [picture, setPicture] = useState(null)

	//This is run whenever the component is first loaded
	useEffect(() => {
		// call api to get profile info
		callApi('GET', ME, null, handleMeResponse)
	}, [])

	function handleMeResponse() {
		// is the response good?
		if ( this.status == 200 ) {
			var data = JSON.parse(this.responseText)
			console.log(data)
			// get user name and image
			setName(data.display_name)
			setPicture(data.images[0].url)
		} else { // other error occured
			console.log(this.responseText)
			alert(this.responseText)
		}
	}
	
	// calling API skeleton method
	function callApi(method, url, body, callback) {
		let xhr = new XMLHttpRequest()
		xhr.open(method, url, true)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
		xhr.send(body)
		xhr.onload = callback
	}

	const RecentItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to right, #2D46B9, #1ED760)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	return (
		<div className='App'>
			<SideBar className='sidebar'/>
			<div className='App-header'>
				<RecentItem sx={{margin: '20px 30px 20px 30px'}}>
					<Typography
						variant="h2"
						fontFamily={font}
						fontWeight={600}
						sx={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
					>
						{name}'s Reviews
					</Typography>
				</RecentItem>
				
			</div>
			<div className='Profile-Picture'>
				<img src={picture} width={170} height={170}/>
			</div>
			
		</div>
	)
} // end Profile()

