import React from 'react'
import { Box, Grid, ListItem, ListItemAvatar } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function FriendListItem(props) {
	return(
		<ListItem
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '175px',
				borderRadius: '10px',
			}}
		>
			{/* profile picture */}
			<ListItemAvatar></ListItemAvatar>

			{/* maybe put the grid here? */}

		</ListItem>
	)
}