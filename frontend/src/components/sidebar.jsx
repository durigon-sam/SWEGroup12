import React from 'react'
import { Drawer, List, ListItemText, ListItemButton, Typography, Alert } from '@mui/material'
import '../styles/sidebar.css'
import { useNavigate } from 'react-router-dom'

export default function SideBar(){

	const src = '/BeatBlendr_Logos/VertAlt_Color_White.png'
	const buttonLabels = ['Find Music', 'Create Playlist', 'My Profile']

	const navigate = useNavigate()

	const handleListButtonClick = (arg) => {
		//alert(arg)
		if (arg === buttonLabels[0]){
			navigate('/search')
		}else if (arg === buttonLabels[1]){
			navigate('/playlist')
		}else if (arg === buttonLabels[2]){
			navigate('/profile')
		}
	}

	const handleLogoutClick = () => {
		// if the userId does not match mine go to login page 
		if (localStorage.getItem('client_id') != '31c97b67a40b4057a56c59c6390b92d4') {
			navigate('/login')
		}
		// if they do match, stay on the same page
		else {
			return (alert('You are already logged in!'))
		}
	}

	return(
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
				<Typography className='logoutText' variant='h4'>
				Login
				</Typography>
			</ListItemButton>
		</Drawer>
	)
}