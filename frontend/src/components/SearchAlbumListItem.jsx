import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, Typography, Rating } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import ReviewDialog from './ReviewDialog'
import ReviewDataService from '../services/reviewService'

export default function SearchAlbumListItem(props){

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const album = props.item
	const [isReviewed, setIsReviewed] = useState(false)
	// const [avgReview, setAverageReview] = useState()
	const [userRatingVal, setUserRatingVal] = useState(2)
	const reviewService = new ReviewDataService()

	useEffect(() => {
		reviewService.getReviewByUser(album.id, localStorage.getItem('userId'))
			.catch(error => {
				// console.log(error)
			})
			.then(response => {
				if (response != undefined){
					setIsReviewed(true)
					setUserRatingVal(response.data.rating)
				}
				
			})
	}, [])

	useEffect(() => {

	}, [isReviewed])

	return(
		<ListItem
			sx={{
				background: 'linear-gradient(to right, #2D46B9, #3D2159)',
				height: '175px',
				borderRadius: '10px',
				minWidth: '630px',
				marginBottom: 5
			}}
		>
			<Grid container columns={12} sx={{ marginRight: '10px', flexShrink: 0, overflow: 'auto', whiteSpace: 'nowrap'}}>
				<Grid item xs={2}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						minWidth: '128px', 
						overflow: 'auto',
						whiteSpace: 'nowrap'
					}}>
					<Avatar 
						sx={{
							width: '128px',
							height: '128px',
							borderRadius: '0',
						}}
						src={album.images[1].url}
					/>
				</Grid>

				{/* item info */}
				<Grid item xs={7} sx={{paddingLeft: '10px', overflow: 'hidden', minWidth: '100px', flexShrink: 0}}>
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
						{album.name}
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
						{album.artists.map(artist => artist.name).join(', ')}
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
						{album.album_type === 'single' ? 'Single' : 'Album'}
					</Typography>
				</Grid>

				<Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
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
								size='small'
								name='Music Rating'
								precision={0.5}
								value={userRatingVal}
							/> //review Score goes here
							:
							//button goes here 
							<ReviewDialog item={album} isAlbum/>
							//end isReview logic
					}
				</Grid>
			</Grid>
		</ListItem>
	)
}