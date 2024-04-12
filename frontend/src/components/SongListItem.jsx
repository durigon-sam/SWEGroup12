import React from 'react'
import { Avatar, Box, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

export default function SongListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const song = props.item
	const navigate = useNavigate()

	//TODO: maybe make this a modal instead of a page?
	const handleReviewButton = () => {
		navigate(`/review/${song.track.id}`)
	}
	
	return(
		<ListItem key={props.item.id}
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
				minWidth: '630px'
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
						src={song.track.album.images[1].url}
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
						{song.track.name}
					</Typography>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{song.track.artists.map(artist => artist.name).join(', ')}
					</Typography>
					{/* TODO align this to the bottom of the card */}
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300}
						fontSize={'20px'}
						style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
					>
						{song.track.album.name}
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
						{new Date(song.played_at).toLocaleDateString()}
					</Typography>
					<Typography 
						fontFamily={font} 
						color={'white'} 
						fontWeight={300} 
						fontSize={'120%'}
						style={{height: '33%'}}
					>
						{new Date(song.played_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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