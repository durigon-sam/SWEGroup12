import React from 'react'
import { Box, Grid, ListItem, ListItemText, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function SongListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const {id, album_art, song_name, artist_name, album_name, time_listened} = props.item
	return(
		<ListItem key={props.item.id}
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
			}}
		>
			<Grid container columns={12}>
				{/* album art */}
				<Grid item xs={2} 
					sx={{ 
						display: 'flex', 
						justifyContent: 'center', 
						alignItems: 'center'
					}}>
					<Box sx={{
						bgcolor: 'white', 
						height: '128px',
						width: '128px',
					}}>
                        
					</Box>
				</Grid>

				{/* song info */}
				{/* TODO: create scrolling effect for horizontal overflow like in tiktok tutorial */}
				<Grid item xs={8} sx={{paddingLeft: '10px'}}>
					<Typography fontFamily={font} color={'white'} fontWeight={300}>{song_name}</Typography>
					<Typography fontFamily={font} color={'white'} fontWeight={300}>{Array.isArray(artist_name) ? artist_name.join(', ') : artist_name}</Typography>
					<Typography fontFamily={font} color={'white'} fontWeight={300}>{album_name}</Typography>
				</Grid>

				{/* user info */}
				<Grid item xs={2} sx={{textAlign: 'right'}}>
					<Typography fontFamily={font} color={'white'} fontWeight={300}>
						{new Date(time_listened).toLocaleString()}
					</Typography>

					{/* TODO: Put Review Button Here */}
				</Grid>


			</Grid>

		</ListItem>
	)
}