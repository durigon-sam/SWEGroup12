import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, ListItemAvatar, Typography, Button } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'
import UserDataService from '../services/userService'

export default function SearchFriendItem(props) {

	const navigate = useNavigate()
	const font = './LibreFranklin-VariableFont_wght.ttf'
	const item = props.item
	const userService = new UserDataService()

	// this is backend version!
	const handleAvatarClick = () => {
		navigate(`profile/${item.id}`)
	}

	const handleAddFriend = () => {
		userService.addFriend(localStorage.getItem('userId'), item.username)
			.then(response => {
				alert(`Successfully added ${item.username} as a friend`)
			})
			.catch(error=> {
				if (error.response.status === 409){
					alert('User is already your friend')
				}else{
					alert(`Add friend failed, ${item.username} not added`)
				}
			})
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

			<Grid container columns={8}
				sx={{
                    
				}}
			>
				<Grid item xs={1}>
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
				</Grid>
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
                        Ratings: {item.reviews.length}
					</Typography>
				</Grid>
				<Grid item xs={2}>
					
				</Grid>
				<Grid item xs={2} sx={{
					display: 'flex',
					alignItems: 'center', // Vertically center the content
					justifyContent: 'center', // Horizontally align the content to the center
				}}>
					<Button
						variant='contained'
						size='medium'
						onClick={handleAddFriend}
					>
                        Add Friend
					</Button>
				</Grid>
			</Grid>
		</ListItem>
	)
}