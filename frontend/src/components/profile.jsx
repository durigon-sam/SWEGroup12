import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import ReviewListItem from './ReviewListItem'
import reviews from '../dummydata/reviews.json'
import UserDataService from '../services/userService'

const ME = 'https://api.spotify.com/v1/me'
const font = './LibreFranklin-VariableFont_wght.ttf'

export default function Profile () {

	const userDataService = new UserDataService()

	const [name, setName] = useState(null)
	const [picture, setPicture] = useState(null)

	// the user's reviews should be entered into here
	// call setReviewResults inside of the backend API call .then part
	//const [reviewResults, setReviewResults] = useState([])

	const [reviewsState, setReviewsState] = useState(() => {
		const storedState = localStorage.getItem('reviewsState')
		return storedState ? JSON.parse(storedState) : { reviews: [] }
	})

	// this is run whenever the component is first loaded
	useEffect(() => {
		// call the backend method to get all user's reviews using the user's beatblendr id
		// userDataService.getReviews(localStorage.getItem('userId')) // refers to method in userService.java (frontend)
		// 	.then(response => {
		// 		//store the list of reviews
		// 		console.log('Response: ' + response)
		// 		setReviewResults(response) // may need response dot something
		// 	})

		setReviewsState(reviews) // this was here before
		// call api to get profile info
		callApi('GET', ME, null, handleMeResponse)
	}, [])

	// this runs whenever the reviewsState is modified
	useEffect(() => {
		localStorage.setItem('reviewsState', JSON.stringify(reviewsState))
	}, [reviewsState])

	function handleMeResponse() {
		// is the response good?
		if ( this.status == 200 ) {
			var data = JSON.parse(this.responseText)
			console.log(data)
			// get user name and image
			setName(data.display_name)
			setPicture(data.images[0].url)
		} else { // other error occured
			console.log(this.responseText)
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

	const RecentItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to right, #2D46B9, #1ED760)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	return (
		<div className='App'>
			<SideBar className='sidebar'/>
			<Box className='App-header'>
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
								{name}'s Reviews
							</Typography>
						</RecentItem>

						{/* REVIEWS LIST */}
						<List
							sx={{
								position: 'relative',
								overflow: 'auto',
								maxHeight: '80vh',
								'& ul': { padding: 0 },
							}}
						>
							{/* This gets replaced with the actual review data */}
							{reviewsState.reviews.map((item) => (
								<ReviewListItem key={item.name} item={item}/>
							))}
						</List>
					</Grid>

					<div className='Profile-Picture'>
						<img src={picture}/>
					</div>
				</Grid>
			</Box>
			
		</div>
	)
} // end Profile()

