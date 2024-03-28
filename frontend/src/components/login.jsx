import React from 'react'
import '../styles/App.css'
import { Box } from '@mui/material'

// global variables
var redirect_uri = 'http://localhost:3000/login' // change to correct url
var client_id = '' 
var client_secret = ''

const AUTHORIZE = 'https://accounts.spotify.com/authorize'

export default function Login () {

	// if user is not logged in yet
	if (client_id == '') {
		return (
			<div className=''>
				<Box className=''>
					<p>Welcome to the login page! If you have a Spotify account already, please follow the directions below. If you do not
						already have a Spotify account, make one and come back.
					</p>
					<p>1. <a href="https://developer.spotify.com/dashboard" target='_blank' rel="noreferrer">CLICK HERE</a> to navigate to the Spotify for Developers website.</p>
					<p>2. Once logged in, click on your name and then 'Dashboard' in the top right corner.</p>
					<p>3. Click 'Create App' and enter any name and description you want.</p>
					<p>4. Under 'Redirect URI' copy and paste this: http://localhost:3000/login</p>
					<p>5. Save and go back to your dashboard.</p>
					<p>6. Click on the app you just created and go into 'Settings'.</p>
					<p>7. At the top you should see 'Client ID' and 'Client secret'. Copy and paste these below to logina to BeatBlendr!</p><br />

					{/* user needs to input their clientId and client secret */}
					<div className="input-id">
						<label htmlFor="clientId" className="form-label">Client ID:</label>
						<input type="text" className="form-control" id="clientId" placeholder=""></input>
					</div><br />

					<div className="input-secret">
						<label htmlFor="clientSecret" className="form-label">Client Secret:</label>
						<input type="text" className="form-control" id="clientSecret" placeholder=""></input>
					</div><br />

					<input type="button" onClick={requestAuthorization} value="Log In"></input><br/>
				</Box>
			</div>
		)
	} else { // if user is already logged in
		// TODO: show the home page 
		return 
	}
} // end login function

// this function calls the authorization endpoint from Spotify API
function requestAuthorization() {
	client_id = document.getElementById('clientId').value
	client_secret = document.getElementById('clientSecret').value
	localStorage.setItem('client_id', client_id)
	localStorage.setItem('client_secret', client_secret)

	let url = AUTHORIZE
	url += '?client_id=' + client_id
	url += '&response_type=code'
	url += '&redirect_uri=' + encodeURI(redirect_uri)
	url += '&show_dialog=true'
	url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'
	window.location.href = url // Show Spotify's authorization screen
}