import React, { useEffect, useState } from 'react'
import '../styles/App.css'
import { Box, Button,Snackbar,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import UserDataService from '../services/userService'

// global variables
var redirect_uri = 'http://localhost:3000/' // once user enters valid info, redirects to homepage
var client_id = '31c97b67a40b4057a56c59c6390b92d4' // hard code max id and secret to use
var client_secret = 'ece0bb69a6944c14ab6e8122ae80aebc'
var success = false
const src = '/BeatBlendr_Logos/Full_Color_White.png'

// API endpoints
const AUTHORIZE = 'https://accounts.spotify.com/authorize'
const TOKEN = 'https://accounts.spotify.com/api/token'
const ME = 'https://api.spotify.com/v1/me'

export default function Login () {

	const navigate = useNavigate()
	const userDataService = new UserDataService()

	const [successState, setSuccessState] = useState(false)
	const [accessToken, setAccessToken] = useState()
	const [open, setOpen] = React.useState(false)

	const handleToastClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	const handleToastOpen = () => {
		setOpen(true)
	}


	useEffect(() => {
		if (window.location.search.length > 0 && !window.location.href.endsWith('?error=access_denied')) {
			success = true
			setSuccessState(true)
			// grab access token
			let code = getCode()
			fetchAccessToken(code)
		} else  {
			setSuccessState(false)
		}
	}, [])

	// after the user logs in, this function is triggered by "Home" button and grabs an access token and routes to home page
	function getTokenAndHome() {
		// if worked
		if (success == true) {
			callApi('GET', ME, null, handleMeResponse)
			navigate('/home')
		} else {
			handleToastOpen('Login Unsuccessful, try again')
		}
	}

	function handleMeResponse() {
		// is the response good?
		if ( this.status == 200 ) {
			var data = JSON.parse(this.responseText)
			// create newUser json
			var newUser = 
				{
					'username': data.display_name, 
					'email': data.email, 
					'accessToken': accessToken,
					'spotifyId': data.id
				}
		
			userDataService.getUserBySpotId(data.id) // refers to method in userService.java (frontend)
				.then(response => {
					// user is found, set local storages for sammy
					localStorage.setItem('userId', response.data.id)
					// console.log('user was found!')
					// console.log(response)
				})
				.catch(error => {
					if(error.response.data.errorCode === 400){
						// call the backend method to add newUser to database
						userDataService.createUser(newUser) // refers to method in userService.java (frontend)
							.then(response => {
								console.log('user added correctly.')
								//console.log(response)
								
								// store userId in LS for Sam
								localStorage.setItem('userId', response.data.id)
							})
							.catch(error => {
								alert(error)
							})
					}else{
						// console.log(error)
					}
				})

		//spotify error
		} else { // other error occured
			// console.log(this.responseText)
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

	return (
		<div className='' style={{backgroundColor: '#001321', width: '100vw', height: '100vh'}}>
			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleToastClose}
				message="This Snackbar will be dismissed in 5 seconds."
			/>
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
						}}>
						Welcome to the login page!
					</Typography>
					{successState ? 
						<Typography
							sx={{
								color: 'white',
								textAlign: 'center',
								fontSize: '25px'
							}}>
							Thank you for logging in! Proceed to home by clicking the button below.
						</Typography> 
						: <Typography
							sx={{
								color: 'white',
								textAlign: 'center',
								fontSize: '25px'
							}}>
							If you have a Spotify account already, login with the button below! If you do not
							already have a Spotify account, make one and come back.
						</Typography>}
					<br /><br /><br /><br />
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
			// console.log('Success!')
			// check if we got an access token. if we did, save it
			if ( data.access_token != undefined ) {
			// console.log('Grabbing token! ' + data.access_token)
				setAccessToken(data.access_token)
				localStorage.setItem('access_token', data.access_token)
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

} // end login function