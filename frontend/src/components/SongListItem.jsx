import React from 'react'
import { Grid, ListItem, ListItemText } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function SongListItem(props) {
	return(
	// eslint-disable-next-line
		<ListItem key={props.id}
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
			}}
		>
			<Grid container columns={12}>
				{/* album art */}
				<Grid item xs={2} sx={{bgcolor: 'white', height: '120px'}}></Grid>

				{/* song info */}
				{/* eslint-disable-next-line */}
				<Grid item xs={7}><ListItemText>{props.id}</ListItemText></Grid>

				{/* user info */}
				<Grid item xs={3}></Grid>
			</Grid>

		</ListItem>
	)
}