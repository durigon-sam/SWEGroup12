import React from 'react'
import '../styles/App.css'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'

// global variables
var redirect_uri = 'http://localhost:3000/login' // once user enters valid info, redirects back to homepage

var client_id = ''
var client_secret = ''
var access_token = null
var refresh_token = null

const src = '/BeatBlendr_Logos/Full_Color_White.png'

// API endpoints
const AUTHORIZE = 'https://accounts.spotify.com/authorize'
const TOKEN = 'https://accounts.spotify.com/api/token'
const RECENTS = 'https://api.spotify.com/v1/me/player/recently-played'

export default function Login () {
	return (
		<div className='' style={{backgroundColor: '#001321', width: '100vw', height: '100vw'}}>
			<Box className=''>
				<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<img src={src} width={550} height={300} />
				</div>
				<div style={{width: '50vw', margin: '0 auto'}}>
					<Typography
						sx={{
							color: 'white',
							textAlign: 'center',
							fontSize: '25px'
						}}>Welcome to the login page! If you have a Spotify account already, please follow the directions below. If you do not
						already have a Spotify account, make one and come back.
					</Typography><br />
				</div>
				<div style={{width: '50vw', margin: '0 auto', backgroundColor: '#1c1c84'}}>
					<List style={{color: 'white'}}>
						<ListItem>1. Navigate to the Spotify for Developers site using this link: https://developer.spotify.com/dashboard</ListItem>
						<ListItem>2. Once logged in, click on your name and then 'Dashboard' in the top right corner.</ListItem>
						<ListItem>3. Click 'Create App' and enter any name and description you want.</ListItem>
						<ListItem>4. Under 'Redirect URI' copy and paste this: http://localhost:3000</ListItem>
						<ListItem>5. Save and go back to your dashboard.</ListItem>
						<ListItem>6. Click on the app you just created and go into 'Settings'.</ListItem>
						<ListItem>7. At the top you should see 'Client ID' and 'Client secret'. Copy and paste these below to login to BeatBlendr!</ListItem>
						<ListItem>31c97b67a40b4057a56c59c6390b92d4</ListItem>
						<ListItem>ece0bb69a6944c14ab6e8122ae80aebc</ListItem>
					</List>
				</div>
				{/* user needs to input their clientId and client secret */}
				<div style={{width: '50vw', margin: '0 auto', display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
					<div style={{margin: '0 auto'}}>
						<TextField fullWidth id="clientId" label="ClientId" variant="standard"/><br /><br />
						<TextField fullWidth id="clientSecret" label="Client Secret" variant="standard"/><br /><br />
						<Button variant="contained" style={{display: 'flex', margin: '0 auto'}} onClick={requestAuthorization}>Log In</Button><br />
						<Button variant="contained" style={{display: 'flex', margin: '0 auto'}} onClick={getToken}>Get Token</Button><br />
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
	body += '&client_id=' + localStorage.getItem('client_id')
	body += '&client_secret=' + localStorage.getItem('client_secret')
	console.log('Body: ' + body)
	callAuthorizationApi(body)
}
  
// issues a POST request using token
function callAuthorizationApi(body){
	let xhr = new XMLHttpRequest()
	xhr.open('POST', TOKEN, true)
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
	xhr.setRequestHeader('Authorization', 'Basic ' + btoa(localStorage.getItem('client_id') + ':' + localStorage.getItem('client_secret')))
	xhr.send(body)
	xhr.onload = handleAuthorizationResponse
}
  
// handles the response that above method gets
function handleAuthorizationResponse(){
	console.log('POOOOP')
	if ( this.status == 200 ){ // success
		var data = JSON.parse(this.responseText)
		console.log('Success! ' + data)
		// check if we got an access token. if we did, save it
		if ( data.access_token != undefined ){
			access_token = data.access_token
			localStorage.setItem('access_token', access_token)
		}
		// check if we got a refresh token. if we did, save it
		if ( data.refresh_token  != undefined ){
			refresh_token = data.refresh_token
			localStorage.setItem('refresh_token', refresh_token)
		}
	}
	else { // failure
		console.log('Failure! ' + this.responseText)
		alert('Failure! ' + this.responseText)
	}
}

// returns the 'code' portion from URL
function getCode() {
	let code = null
	const queryString = window.location.search
	if ( window.location.search.length > 0 ){
		const urlParams = new URLSearchParams(queryString)
		code = urlParams.get('code') // the 'code' attribute in the new link
	}
	return code
}
  
// this function uses the User's id and secret to seek authorization calling Spotify API
function requestAuthorization() {

	// if the url is altered (not first time on the login page)
	if (window.location.search.length > 0) {
		let code = getCode()
		fetchAccessToken(code)
	} else {
		client_id = document.getElementById('clientId').value
		client_secret = document.getElementById('clientSecret').value
		// keeps track of client ID and Secret on page reloads
		localStorage.setItem('client_id', client_id)
		localStorage.setItem('client_secret', client_secret)

		// construct the link shown below in comment
		let url = AUTHORIZE
		url += '?client_id=' + localStorage.getItem('client_id')
		url += '&response_type=code'
		url += '&redirect_uri=' + encodeURI(redirect_uri)
		url += '&show_dialog=true'
		url += '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private'
		window.location.href = url // Show Spotify's authorization screen
	}
}

function getToken() {
	// TODO: put this in correct spot!	
	let code = getCode()
	console.log('Code: ' + code)
	fetchAccessToken(code)
}