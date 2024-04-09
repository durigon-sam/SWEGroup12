import React from 'react'
import { Drawer, List, ListItemText, ListItemButton, Typography, Alert } from '@mui/material'
import '../styles/sidebar.css'
import { useNavigate } from 'react-router-dom'

export default function SideBar(){

	const src = '/BeatBlendr_Logos/VertAlt_Color_White.png'
	const buttonLabels = ['Find Music', 'Create Playlist', 'My Profile']
	const navigate = useNavigate()

	const handleListButtonClick = (arg) => {
		if (arg === buttonLabels[0]){
			navigate('/search')
		} else if (arg === buttonLabels[1]) {
			navigate('/playlist')
		} else if (arg === buttonLabels[2]) {
			navigate('/profile')
		}
	}

	const handleLogoutClick = () => {
		// user needs to logout so wipe credentials and go back to login page
		localStorage.clear()
		navigate('/')
	}

	return (
		<Drawer 
			variant='permanent' 
			anchor='left' 
			sx={{
				'& .MuiDrawer-paper': {
					backgroundColor: '#444444',
					width: '250px'
				}
			}}
		>
			{/* TODO: convert this to grid for better styling */}
			<img className='logo' src={src}/>
			<List style={{ justifyContent: 'center' }}>
				{buttonLabels.map((text) => (
					<ListItemButton 
						className='sidebarButton'
						key={text} 
						sx={{
							height: '130px',
							width: '90%',
							backgroundColor: '#3d2159',
							borderRadius: '45px',
							marginLeft: '5%',
							marginBottom: '20px',
							'&:hover': {
								backgroundColor: '#3d2159'
							}
						}}
						onClick={() => handleListButtonClick(text)}
					//end ListItemButton
					>
						<ListItemText>
							<Typography className='ButtonText' variant='h4'>
								{text}
							</Typography>
						</ListItemText>
					</ListItemButton>
				))}
			</List>
			<ListItemButton className='logoutButton'
				sx={{
					position: 'absolute',
					bottom: '0',
					height: '50px',
					width: '90%',
					backgroundColor: '#2d46b9',
					borderRadius: '45px',
					marginLeft: '5%',
					marginBottom: '30px',
					justifyContent: 'center',
					'&:hover':{
						backgroundColor: '#2d46b9',
					}
				}}
				onClick={handleLogoutClick}
			//end ListItemButton
			>
				<Typography className='logoutText' variant='h4'>Logout</Typography>
			</ListItemButton>
		</Drawer>
	)
}