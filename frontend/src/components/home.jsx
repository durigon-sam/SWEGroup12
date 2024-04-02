import React from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import SongListItem from './SongListItem'
import recentData from '../dummydata/recents.json'
import friends from '../dummydata/friends.json'
import FriendListItem from './FriendListItem'

const RECENTS = 'https://api.spotify.com/v1/me/player/recently-played'
const ME = 'https://api.spotify.com/v1/me'
var recentSongs = []
var name = ''

export default function HomePage(){

	window.onload = onPageLoad()

	const font = './LibreFranklin-VariableFont_wght.ttf'

	const RecentItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to right, #2D46B9, #1ED760)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	const FriendItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to left, #2D46B9, #3D2159)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	function onPageLoad() {
		console.log('Page is Loaded!')
	}

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<Box className='App-header' sx={{}}>
				<Grid container spacing={2} columns={16} sx={{margin: '20px 30px 20px 30px'}}>
					<Grid item xs={10} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<RecentItem>
							<Typography variant='h3' fontFamily={font} fontWeight={600}>My Recent Listening</Typography>
							<Button variant="contained" onClick={getRecentSongs}>Refresh</Button><br />
							{/* <Typography color='white'>{localStorage.getItem('recents')}</Typography> */}
							{/* <Typography color='white'>Current clientId: {localStorage.getItem('client_id')}</Typography> */}
							{/* <Typography color='white'>Access Token: {localStorage.getItem('access_token')}</Typography> */}
						</RecentItem>

						{/* RECENT LISTENING LIST */}
						<List
							sx={{
								position: 'relative',
								overflow: 'auto',
								maxHeight: '80vh',
								'& ul': { padding: 0 },
							}}
						>
							{/* This gets replaced with the actual user data */}
							{recentData.recents.map((item) => (
								<SongListItem key={item.id} item={item}/>
							))}
						</List>
					</Grid>

					<Grid item xs={1} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}/>
					<Grid item xs={5} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<FriendItem>
							<Typography variant='h3' fontFamily={font} fontWeight={700}>My Friends</Typography>
						</FriendItem>

						{/* FRIENDS LIST */}
						<List
							sx={{
								width: '100%',
								position: 'relative',
								overflow: 'auto',
								maxHeight: '80vh',
								'& ul': { padding: 0 },
							}}
						>
							{friends.friends.map((item) => (
								<FriendListItem key={item.userid} item={item}/>
							))}
						</List>
					</Grid>
				</Grid>
			</Box>
		</div>
		
	)
}

// call API to get user profile info
function getRecentSongs() {
	callApi('GET', ME, null, handleMeResponse)
	callApi('GET', RECENTS, null, handleResponse)
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
  
function handleResponse() {
	// is the response good?
	if ( this.status == 200 ){
		var data = JSON.parse(this.responseText)
		console.log(data)
		// get song names from the returned array
		for (let i = 0; i < data.items.length; i++) { 
			// store just the song names in an array	
			// console.log(data.items[i].track.name)
			recentSongs[i] = data.items[i].track.name
			console.log(recentSongs[i])
		}
		// store entire array in LS
		localStorage.setItem('recents', recentSongs)
		// need to refresh the page for some reason to get the LS crap working
		location.reload()
	} else { // other error occured
		console.log(this.responseText)
		alert(this.responseText)
	}
}

function handleMeResponse() {
	// is the response good?
	if ( this.status == 200 ){
		var data = JSON.parse(this.responseText)
		console.log(data)
		name = data.display_name
		localStorage.setItem('name', name)
	} else {// other error occured
		console.log(this.responseText)
		alert(this.responseText)
	}
}