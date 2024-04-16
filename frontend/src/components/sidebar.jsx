import React, { useEffect, useState } from 'react'
import { Drawer, List, ListItemText, ListItemButton, Typography, Alert, Box } from '@mui/material'
import '../styles/sidebar.css'
import { useNavigate } from 'react-router-dom'

export default function SideBar(props){

	const src = '/BeatBlendr_Logos/VertAlt_Color_White.png'
	const buttonLabels = ['Go Home', 'Find Music', 'My Profile']
	const navigate = useNavigate()
	const [currentPage, setCurrentPage] = useState()

	const handleListButtonClick = (arg) => {
		if (arg === buttonLabels[0]){
			navigate('/home')
		} else if (arg === buttonLabels[1]) {
			navigate('/search')
		} else if (arg === buttonLabels[2]) {
			navigate('/profile') // need to add extension including id 
		}
	}

	const handleLogoutClick = () => {
		// user needs to logout so wipe credentials and go back to login page
		localStorage.clear()
		navigate('/')
	}

	const handleHomeClick = () => {
		navigate('/home')
	}

	useEffect(() => {
		if (window.location.href.includes('/home'))
			setCurrentPage(0)
		else if (window.location.href.includes('/search'))
			setCurrentPage(1)
		else
			setCurrentPage(2)
	}, [])

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
			{/* TODO: convert this to grid for better styling */}
			<img className='logo' src={src}/>
			<List style={{ justifyContent: 'center' }}>
				{buttonLabels.map((text, index) => (
					<ListItemButton 
						className='sidebarButton'
						key={text} 
						sx={{
							height: '130px',
							width: '90%',
							backgroundColor: index === currentPage ? '#3d2159' : '#2D46B9',
							borderRadius: '45px',
							marginLeft: '5%',
							marginBottom: '20px',
							'&:hover': {
								backgroundColor: index === currentPage ? '#3d2159' : '#2D46B9',
								border: '5px solid',
								borderColor: index === currentPage ? '#3d2159' : '#1ed760',
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

			<Box
				sx={{
					position: 'absolute',
					bottom: 0,
					width: '90%',
					marginLeft: '5%'
				}}
			>
				<ListItemButton className='logoutButton'
					sx={{
						height: '50px',
						backgroundColor: '#2d46b9',
						borderRadius: '45px',
						marginBottom: '20px',
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
			</Box>
		</Drawer>
	)
}
