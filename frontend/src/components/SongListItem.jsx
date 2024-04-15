import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, ListItemButton, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function SongListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const song = props.item
	const search = props.search
	const time = props.time
	const [avgReview, setAverageReview] = useState()
	const [isReviewed, setIsReviewed] = useState(false)

	// TODO:  probably used for userscore logic, maybe for modal, unsure yet
	const [userScore, setUserScore] = useState()
	const [userReview, setUserReview] = useState()

	//TODO: implement review modal, no reason to be a separate page
	const handleReviewButton = () => {
		// navigate(`/review/${song.id}`)

	}

	useEffect(()=>{
		// TODO: call API for average review using song's id
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
				{/* TODO: WHEN YOU HAVE MORE TIME BC THIS IS ANNOYING: create scrolling effect for horizontal overflow like in tiktok tutorial */}
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
						fontWeight={300} 
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{song.name}
					</Typography>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{song.artists.map(artist => artist.name).join(', ')}
					</Typography>
					{/* TODO align this to the bottom of the card */}
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300}
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{song.album.name}
					</Typography>
				</Grid>

				{/* user info */}
				{search ? 
					// if on search page, display review totals
					<Grid item xs={2} sx={{textAlign: 'right'}}>
						<Typography 
							fontFamily={font} 
							color={'white'} 
							fontWeight={300} 
							fontSize={'120%'}
							style={{height: '33%'}}
						>
							Avg. Score
						</Typography>
						
						{
							//if reviewed, display score. else, display button
							isReviewed ? 
								true //review Score goes here
								:
							//button goes here 
								<ListItemButton
									className='reviewButton'
									sx={{
										width: '80%',
										minWidth: '100px',
										backgroundColor: '#3D2159',
										borderRadius: '45px',
										marginLeft: 'auto', // Align the button to the right
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										'&:hover': {
											backgroundColor: '#1ED760',
										}
									}}
									onClick={handleReviewButton}
								>
									<Typography className='reviewText' >
							Review
									</Typography>
								</ListItemButton>
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
						<ListItemButton
							className='reviewButton'
							sx={{
								width: '80%',
								minWidth: '100px',
								backgroundColor: '#3D2159',
								borderRadius: '45px',
								marginLeft: 'auto', // Align the button to the right
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								'&:hover': {
									backgroundColor: '#1ED760',
								}
							}}
							onClick={handleReviewButton}
						>
							<Typography className='reviewText' >
							Review
							</Typography>
						</ListItemButton>
					</Grid>
				//end searchpage logic
				}
			</Grid>

		</ListItem>
	)
}