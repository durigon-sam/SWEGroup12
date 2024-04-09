import React from 'react'
import { Box, Grid, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

export default function SearchListItem(props){

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
			{props.item}
		</ListItem>
	)
}