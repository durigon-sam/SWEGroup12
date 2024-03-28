import React from 'react'
import '../styles/App.css'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// global variables
var redirect_uri = 'http://localhost:3000/' // once user enters valid info, redirects back to homepage
var client_id = '' 
var client_secret = ''

// API endpoint
const AUTHORIZE = 'https://accounts.spotify.com/authorize'

export default function Login () {
	return (
		<div className=''>
			<Box className=''>
				<Typography>Welcome to the login page! If you have a Spotify account already, please follow the directions below. If you do not
					already have a Spotify account, make one and come back.</Typography>
				<List>
					<ListItem>1. Navigate to the Spotify for Developers site using this link: https://developer.spotify.com/dashboard</ListItem>
					<ListItem>2. Once logged in, click on your name and then 'Dashboard' in the top right corner.</ListItem>
					<ListItem>3. Click 'Create App' and enter any name and description you want.</ListItem>
					<ListItem>4. Under 'Redirect URI' copy and paste this: http://localhost:3000</ListItem>
					<ListItem>5. Save and go back to your dashboard.</ListItem>
					<ListItem>6. Click on the app you just created and go into 'Settings'.</ListItem>
					<ListItem>7. At the top you should see 'Client ID' and 'Client secret'. Copy and paste these below to login to BeatBlendr!</ListItem>
				</List>

				{/* user needs to input their clientId and client secret */}
				<TextField id="clientId" label="ClientId" variant="standard" /><br />
				<TextField id="clientSecret" label="Client Secret" variant="standard" /><br /><br />

				<Button variant="contained" onClick={requestAuthorization}>Log In</Button>
			</Box>
		</div>
	)
} // end login function

// this function calls the authorization endpoint from Spotify API
function requestAuthorization() {
	// store the clientId and client secret for later use
	client_id = document.getElementById('clientId').value
	client_secret = document.getElementById('clientSecret').value
	localStorage.setItem('client_id', client_id)
	localStorage.setItem('client_secret', client_secret)

	// construct the new url with data included
	let url = AUTHORIZE
	url += '?client_id=' + client_id
	url += '&response_type=code'
	url += '&redirect_uri=' + encodeURI(redirect_uri)
	url += '&show_dialog=true'
	url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'
	window.location.href = url // Show Spotify's authorization screen
}