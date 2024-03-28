import React from 'react'
import { Box, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

export default function SongListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const {id, album_art, song_name, artist_name, album_name, time_listened} = props.item
	const navigate = useNavigate()

	//TODO: maybe make this a modal instead of a page?
	const handleReviewButton = () => {
		navigate('/review')
	}
	
	return(
		<ListItem key={props.item.id}
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
			}}
		>
			<Grid container columns={12} sx={{whiteSpace: 'nowrap'}}>
				{/* album art */}
				<Grid item xs={2} 
					sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center',
						minWidth: '128px'
					}}>
					<Box sx={{
						bgcolor: 'white', 
						height: '128px',
						width: '128px',
					}}>
                        
					</Box>
				</Grid>

				{/* song info */}
				{/* TODO WHEN YOU HAVE MORE TIME BC THIS SUCKS: create scrolling effect for horizontal overflow like in tiktok tutorial */}
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
						{song_name}
					</Typography>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{Array.isArray(artist_name) ? artist_name.join(', ') : artist_name}
					</Typography>
					{/* TODO align this to the bottom of the card */}
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300}
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{album_name}
					</Typography>
				</Grid>

				{/* user info */}
				<Grid item xs={2} sx={{textAlign: 'right'}}>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'120%'}
						style={{height: '33%'}}
					>
						{new Date(time_listened).toLocaleDateString()}
					</Typography>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'120%'}
						style={{height: '33%'}}
					>
						{new Date(time_listened).toLocaleTimeString()}
					</Typography>

					{/* TODO: Put Review Button Here */}
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


			</Grid>

		</ListItem>
	)
}