import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import SongListItem from './SongListItem'
import friends from '../dummydata/friends.json'
import FriendListItem from './FriendListItem'
import userDataService from '../services/userService'

const RECENTS = 'https://api.spotify.com/v1/me/player/recently-played'
const ME = 'https://api.spotify.com/v1/me'
var name = ''

export default function HomePage(){

	//this establishes friendsState as a state variable and hooks it up with localStorage
	//TODO: get rid of this local storage thing here, just use state and useEffect
	const [friendsState, setFriendsState] = useState(() => {
		const storedState = localStorage.getItem('friendsState')
		return storedState ? JSON.parse(storedState) : { friends: [] }
	})

	// Initialize state for Recent Songs
	const [recentSongsState, setRecentSongsState] = useState([])

	//This is run whenever the component is first loaded
	useEffect(() => {
		//TODO: uncomment this when service and REST API call are implemented
		// use this form for all state variables and REST API calls
		
		// const userDataService = new userDataService();
		// userDataService.getFriendsOfUser()
		// 	.then(response => {
		// 		setFriendsState(response.data)
		// 	})
		setFriendsState(friends)

		// Get Recent Songs
		callApi('GET', RECENTS, null, handleResponse)
		// callApi('GET', ME, null, handleMeResponse)
	}, [])

	//this runs whenever the friendsState is modified
	useEffect(() => {
		localStorage.setItem('friendsState', JSON.stringify(friendsState))
	}, [friendsState])

	// calling API skeleton method
	function callApi(method, url, body, callback){
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
			// set the returned songs to the state variable
			setRecentSongsState(data.items)
		} else { // other error occured
			console.log(this.responseText)
			alert(this.responseText)
		}
	}

	// TODO: don't think we need this here, should be on profile page
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

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<Box className='App-header' sx={{}}>
				<Grid container spacing={2} columns={16} sx={{margin: '20px 30px 20px 30px'}}>
					<Grid item xs={10} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<RecentItem>
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
								My Recent Listening
							</Typography>
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
							{recentSongsState.map((item) => (
								<SongListItem key={item.track.id} item={item}/>
							))}
						</List>
					</Grid>

					<Grid item xs={1} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}/>
					<Grid item xs={5} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<FriendItem>
							<Typography
								variant="h2"
								fontFamily={font}
								fontWeight={700}
								sx={{
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								My Friends
							</Typography>
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
							{friendsState.friends.map((item) => (
								<FriendListItem key={item.userid} item={item}/>
							))}
						</List>
					</Grid>
				</Grid>
			</Box>
		</div>
		
	)
}
