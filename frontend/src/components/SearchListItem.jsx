import React from 'react'
import { Box, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

export default function SearchListItem(props){

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const {id, songid, album_art, song_name, artist_name, album_name, time_listened} = props.item


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
			<Grid container columns={12} sx={{ marginRight: '10px'}}>
				<Grid item xs={2}
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'left',
						minWidth: '128px', 
					}}>
					<Box sx={{
						bgcolor: 'white',
						height: '128px',
						width: '128px',
					}}/>
				</Grid>

				{/* item info */}
				<Grid item xs={8} 
					sx={{
						
					}}
				>

				</Grid>
			</Grid>
		</ListItem>
	)
}