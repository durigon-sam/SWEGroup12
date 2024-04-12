import React, { useEffect } from 'react'
import '../styles/App.css'
import { Box, Button,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

// global variables
var redirect_uri = 'http://localhost:3000/' // once user enters valid info, redirects to homepage
var client_id = '31c97b67a40b4057a56c59c6390b92d4' // hard code max id and secret to use
var client_secret = 'ece0bb69a6944c14ab6e8122ae80aebc'
var access_token = null
var refresh_token = null
var success = false
const src = '/BeatBlendr_Logos/Full_Color_White.png'

// API endpoints
const AUTHORIZE = 'https://accounts.spotify.com/authorize'
const TOKEN = 'https://accounts.spotify.com/api/token'

export default function Login () {

	const navigate = useNavigate()

	useEffect(() => {
		if (window.location.search.length > 0) {
			success = true
			// grab access token
			let code = getCode()
			fetchAccessToken(code)
		}
	}, [])

	// console.log('Success value is: ' + success)

	// after the user logs in, this function is triggered by "Home" button and grabs an access token and routes to home page
	function getTokenAndHome() {
		// if worked
		if (success == true) {
			navigate('/home')
		} else {
			alert('Login Unsuccessful, try again')
		}
	}

	return (
		<div className='' style={{backgroundColor: '#001321', width: '100vw', height: '100vh'}}>
			<Box className=''>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<img src={src} width={600} height={260} />
				</div>
				<div style={{width: '60vw', margin: '0 auto'}}>
					<Typography
						sx={{
							color: 'white',
							textAlign: 'center',
							fontSize: '25px'
						}}>Welcome to the login page! If you have a Spotify account already, login with the button below! If you do not
						already have a Spotify account, make one and come back.
					</Typography><br /><br /><br /><br />
				</div>
				{/* user needs to input their clientId and client secret */}
				<div style={{width: '60vw', margin: '0 auto', display: 'flex', justifyContent: 'center'}}>
					<div style={{margin: '0 auto'}}>
						<div style={{display: 'flex', margin: '0 auto', justifyContent: 'center'}}>
							{/* logic to only show one button at a time */}
							{( window.location.search.length > 0 ) ? 
								<>
									<Button variant="contained" style={{height: '9vw', width: '18vw'}} onClick={getTokenAndHome}>
										<Typography variant="h3">
											Home
										</Typography>
									</Button><br />
								</> :
								<>
									<Button variant="contained" style={{height: '9vw', width: '18vw'}} onClick={requestAuthorization}>
										<Typography variant="h3">
											Log In
										</Typography>
									</Button><br />
								</>
							}							
						</div>
					</div>
				</div>
			</Box>
		</div>
	)
} // end login function

/* BELOW DEALS WITH AUTHORIZING THE USER WITH SPOTIFY API CALLS*/

function fetchAccessToken(code) {
	let body = 'grant_type=authorization_code' // build a formpost body (similar to JSON)
	body += '&code=' + code 
	body += '&redirect_uri=' + encodeURI(redirect_uri)
	body += '&client_id=' + client_id
	body += '&client_secret=' + client_secret
	// console.log('Body: ' + body)
	callAuthorizationApi(body)
}
  
// issues a POST request using token
function callAuthorizationApi(body){
	let xhr = new XMLHttpRequest()
	xhr.open('POST', TOKEN, true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(client_id + ':' + client_secret))
	xhr.send(body)
	xhr.onload = handleAuthorizationResponse
}
  
// handles the response that above method gets
function handleAuthorizationResponse(){
	if ( this.status == 200 ) { // success
		var data = JSON.parse(this.responseText)
		console.log('Success!')
		// check if we got an access token. if we did, save it
		if ( data.access_token != undefined ) {
			// console.log('Grabbing token! ' + data.access_token)
			access_token = data.access_token
			localStorage.setItem('access_token', access_token)
		}
		// check if we got a refresh token. if we did, save it
		if ( data.refresh_token  != undefined ) {
			refresh_token = data.refresh_token
			localStorage.setItem('refresh_token', refresh_token)
		}
	} else { // failure
		// console.log('Failure! ' + this.responseText)
		alert('Failure! ' + this.responseText)
	}
}

// returns the 'code' portion from URL
function getCode() {
	let code = null
	const queryString = window.location.search
	if ( window.location.search.length > 0 ) {
		const urlParams = new URLSearchParams(queryString)
		code = urlParams.get('code') // the 'code' attribute in the new link
	}
	return code
}
  
// this function uses the User's id and secret to seek authorization calling Spotify API
function requestAuthorization() {
	// keeps track of client ID and Secret on page reloads
	localStorage.setItem('client_id', client_id)
	localStorage.setItem('client_secret', client_secret)

	// construct the link shown below in comment
	let url = AUTHORIZE
	url += '?client_id=' + client_id
	url += '&response_type=code'
	url += '&redirect_uri=' + encodeURI(redirect_uri)
	url += '&show_dialog=true'
	url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'
	window.location.href = url // Show Spotify's authorization screen
}