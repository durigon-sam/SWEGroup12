import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, ListItemAvatar, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'

export default function FriendListItem(props) {

	// TODO: fix friends styling on these cards

	const navigate = useNavigate()
	const font = './LibreFranklin-VariableFont_wght.ttf'
	const item = props.item

	// this is backend version!
	const handleAvatarClick = () => {
		navigate(`/profile/${item.id}`)

	}

	return(
		<ListItem
			sx={{
				background: 'linear-gradient(to right, #2D46B9, #3D2159)',
				marginBottom: 5,
				height: '125px',
				borderRadius: '10px',
			}}
		>
			{/* profile picture */}
			<ListItemAvatar>
				<Avatar 
					src='/BeatBlendr_Logos/Icon_Color.png'
					sx={{
						height: '64px',
						width: '64px',
						'&: hover': {
							border: '2px solid',
							borderColor: 'white'
						}
					}}
					onClick={handleAvatarClick}
				/>
			</ListItemAvatar>
			{/* maybe put the grid here? */}
			<Grid container columns={3} sx={{marginLeft: '20px'}}>
				<Grid item xs={3} sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-start', // Horizontally align the content to the right
					justifyContent: 'center', // Vertically center the content
				}}>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{item.username}
					</Typography>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							textAlign: 'right',
							wordWrap: 'break-word',
							whiteSpace: 'normal',
						}}
					>
						{/* Ratings: {Array.isArray(item.reviews) ? item.reviews.length : 0} */}
					</Typography>
				</Grid>
			</Grid>

		</ListItem>
	)
}