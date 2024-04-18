import React, { useEffect, useState } from 'react'
import { Avatar, Grid, ListItem, ListItemAvatar, Typography, Button, Snackbar, Alert } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'
import { useNavigate } from 'react-router-dom'
import UserDataService from '../services/userService'

export default function SearchFriendItem(props) {

	const navigate = useNavigate()
	const font = './LibreFranklin-VariableFont_wght.ttf'
	const item = props.item
	const [toastMsg, setToastMsg] = React.useState('Initial State')
	const [toastOpen, setToastOpen] = React.useState(false)
	const [toastSever, setToastSever] = React.useState('error')
	const userService = new UserDataService()

	// this is backend version!
	const handleAvatarClick = () => {
		navigate(`/profile/${item.id}`)
	}

	const handleAddFriend = () => {
		userService.addFriend(localStorage.getItem('userId'), item.username)
			.then(response => {
				setToastMsg(`Successfully added ${item.username} as a friend`)
				setToastSever('success')
				handleToastOpen()
			})
			.catch(error=> {
				if (error.response.status === 409){
					setToastMsg('User is already your friend')
					setToastSever('error')
					handleToastOpen()
				}else{
					setToastMsg(`Add friend failed, ${item.username} not added`)
					setToastSever('error')
					handleToastOpen()
				}
			})
	}

	const handleToastOpen = () => {
		setToastOpen(true)
	}

	const handleToastClose = (event, reason) => {
		if (reason === 'clickaway')
			return

		setToastOpen(false)
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
			<Snackbar
				open={toastOpen}
				autoHideDuration={5000}
				onClose={handleToastClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					open={toastOpen}
					severity={toastSever}
					variant='filled'
					sx={{width: '100%'}}
				>{toastMsg}</Alert>
			</Snackbar>
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