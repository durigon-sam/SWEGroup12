import React, { useEffect, useRef, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import SongListItem from './SongListItem'
import FriendListItem from './FriendListItem'
import UserDataService from '../services/userService'

const RECENTS = 'https://api.spotify.com/v1/me/player/recently-played'

export default function HomePage(){

	const userDataService = new UserDataService()

	// initialize states for Recent Songs and Friends
	const [friendsState, setFriendsState] = useState([])
	const [recentSongsState, setRecentSongsState] = useState([])
	const [noFriends, setNoFriends] = useState()
	
	// this is run whenever the component is first loaded
	useEffect(() => {
		

		// get Recent Songs to display on the left side of home page
		callApi('GET', RECENTS, null, handleResponse)
	}, [])

	useEffect(() => {
		// call the backend method to get all user's friends using the user's beatblendr id
		userDataService.getFriends(localStorage.getItem('userId')) // refers to method in userService.java (frontend)
			.then(response => {
				// store the list of friends
				if (response != undefined) {
					// set friends state
					// console.log(response)
					setFriendsState(response.data)
				}else if (response.data.length == 0) {
					setNoFriends(true)
				}
			})
			.catch(error => {
			
			})
	}, [recentSongsState])

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
					<Grid item xs={10} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px', width: '50vw'}}}>
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
							{
								recentSongsState.map((item) => (
									<SongListItem key={item.track.id} item={item.track} search={false} time={item.played_at}/>
								))
							}
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
							
							{friendsState.map((item) => (
								<FriendListItem key={item.userid} item={item}/>
							))}

							
							
						</List>
					</Grid>
				</Grid>
			</Box>
		</div>
		
	)
}
