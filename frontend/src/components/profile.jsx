import React from 'react'
import '../styles/App.css'
import { Box, Button, FormControl, InputLabel, List, ListItem, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const RECENTS = 'https://api.spotify.com/v1/me/player/recently-played'
var recentSongs = []

export default function Profile () {

	const navigate = useNavigate()
    
	function goHome() {
		navigate('/home')
	}

	return (
		<div>
			<Typography>Your clientId is: {localStorage.getItem('client_id')}</Typography>
			<Typography>Your client secret is: {localStorage.getItem('client_secret')}</Typography>
			<Typography>Your access token is: {localStorage.getItem('access_token')}</Typography><br /><br />

			<Button variant="contained" onClick={getRecentSongs}>Get Recently Played Songs</Button>
			<Typography>(check console in inspect element)</Typography><br />

			

			<Button variant="contained" onClick={goHome}>Home</Button><br />
		</div>
	)
} // end Search()

// calling API skeleton method
function callApi(method, url, body, callback) {
	let xhr = new XMLHttpRequest()
	xhr.open(method, url, true)
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
	xhr.send(body)
	xhr.onload = callback
}

// call API to get user profile info
function getRecentSongs() {
	callApi('GET', RECENTS, null, handleResponse)
}
  
function handleResponse() {
	// is the response good?
	if ( this.status == 200 ){
		var data = JSON.parse(this.responseText)
		console.log(data)
		addSongsToList(data)
	} else { // other error occured
		console.log(this.responseText)
		alert(this.responseText)
	}
}

function addSongsToList(data) {
	// get song names from the returned array
	for (let i = 0; i < data.items.length; i++) { 
		// store just the song names in an array	
		console.log(data.items[i].track.name)
		recentSongs.push(data.items[i].track.name)
	}
	return recentSongs
}