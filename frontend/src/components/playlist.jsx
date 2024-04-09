import React from 'react'
import '../styles/App.css'
import { Box, Button, List, ListItem, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Playlist () {

	const navigate = useNavigate()
     
	function goHome() {
		navigate('/home')
	}

	return (
		<div>
			<Typography>Your clientId is: {localStorage.getItem('client_id')}</Typography>
			<Typography>Your client secret is: {localStorage.getItem('client_secret')}</Typography>
			<Typography>Your access token is: {localStorage.getItem('access_token')}</Typography><br />

			<Button variant="contained" onClick={goHome}>Home</Button><br />
		</div>
	)
} // end Search()