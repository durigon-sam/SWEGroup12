import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, Typography, Rating } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import ReviewDialog from './ReviewDialog'
import ReviewDataService from '../services/reviewService'

export default function SongListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const song = props.item
	const search = props.search
	const time = props.time
	// const isReviewed = props.isReviewed
	// const userRatingVal = props.rating
	// found from backend API calls
	// const [avgReview, setAverageReview] = useState(0)
	const reviewService = new ReviewDataService()
	const [isReviewed, setIsReviewed] = useState(false)
	const [userRatingVal, setUserRatingVal] = useState()

	useEffect(()=>{
		// call API for average review using song's id
    
    
		reviewService.getReviewByUser(song.id, localStorage.getItem('userId'))
			.catch(error => {
			})
			.then(response => {
				if (response != undefined){
					// console.log(`review of ${song.name} found with rating ${response.data.rating}`)
					setUserRatingVal(response.data.rating)
					setIsReviewed(true)
				}
				
			})
	}, [])
	
	return(
		<ListItem key={props.item.id}
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
				minWidth: '630px',
			}}
		>
			<Grid container columns={12} sx={{display: 'flex', flexWrap: 'nowrap'}}>
				{/* album art */}
				<Grid item xs={2} 
					sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center',
						minWidth: '128px'
					}}>
					<Avatar 
						sx={{
							width: '128px',
							height: '128px',
							borderRadius: '0',
						}}
						src={song.album.images[1].url}
					/>
				</Grid>

				{/* song info */}
				<Grid item xs={8} sx={{paddingLeft: '10px', overflow: 'hidden', minWidth: '100px'}}>
					{/* <div 
				style={{
					height: 'fit-content',
					width: '60%',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				<marquee direction='left'>
					<Typography fontFamily={font} color={'white'} fontWeight={300}>{song_name}</Typography>
				</marquee>
			</div> */}
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={600} 
						fontSize={'30px'}
						style={{ 
							overflow: 'hidden', 
							textOverflow: 'ellipsis', 
							whiteSpace: 'nowrap',
							marginBottom: '5px'
						}}
					>
						{song.name}
					</Typography>

					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={600} 
						fontSize={'20px'}
						style={{ 
							overflow: 'hidden', 
							textOverflow: 'ellipsis', 
							whiteSpace: 'nowrap',
							marginBottom: '5px'
						}}
					>
						{song.artists.map(artist => artist.name).join(', ')}
					</Typography>

					{/* TODO align this to the bottom of the card */}
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300}
						fontSize={'20px'}
						style={{ 
							minWidth: '130px',
							wordWrap: 'break-word',
							whiteSpace: 'normal',
							marginBottom: '5px'
						}}
					>
						{song.album.name}
					</Typography>

				</Grid>

				{/* user info */}
				{search ? 
				// if on search page, display review totals
					<Grid item xs={2} sx={{textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
						{/* <Typography 
							fontFamily={font} 
							color={'white'} 
							fontWeight={300} 
							fontSize={'120%'}
							style={{height: '33%'}}
						>
					Avg. Score
						</Typography> */}
				
						{
							//if reviewed, display score. else, display button
							isReviewed ? 
								<Rating
									readOnly
									size='large'
									name='Music Rating'
									precision={0.5}
									value={userRatingVal}
								/> //review Score goes here
								:
							//button goes here 
								<ReviewDialog item={song}/>
							//end isReview logic
						}
					</Grid>
					:
				// if on home page, display time
					<Grid item xs={2} sx={{textAlign: 'right'}}>
						<Typography 
							fontFamily={font} 
							color={'white'} 
							fontWeight={300} 
							fontSize={'120%'}
							style={{height: '33%'}}
						>
							{new Date(time).toLocaleDateString()}
						</Typography>
						<Typography 
							fontFamily={font} 
							color={'white'} 
							fontWeight={300} 
							fontSize={'120%'}
							style={{height: '33%'}}
						>
							{new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
						</Typography>
						{
							//if reviewed, display score. else, display button
							isReviewed ? 
								<Rating
									readOnly
									size='small'
									name='Music Rating'
									precision={0.5}
									value={userRatingVal}
								/> //review Score goes here
								:
							//button goes here 
								<ReviewDialog item={song}/>
							//end isReview logic
						}
					</Grid>
					//end searchpage logic
				}
			</Grid>

		</ListItem>

	)
}