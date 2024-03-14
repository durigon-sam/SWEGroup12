import React from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'

export default function HomePage(){

	const RecentItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to right, #2D46B9, #1ED760)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		marginRight: '40px',
		height: '75px',
	}))

	const FriendItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to left, #2D46B9, #3D2159)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
	}))

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<Box className='App-header' >
				<Grid container spacing={2} columns={12} sx={{margin: '20px 30px 20px 30px'}}>
					<Grid item xs={8} >
						<RecentItem>My Recent Listening</RecentItem>
						<List
							sx={{
								width: '95%',
								// maxWidth: 360,
								bgcolor: 'background.paper',
								position: 'relative',
								overflow: 'auto',
								maxHeight: 800,
								'& ul': { padding: 0 },
							}}
						>
							{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((index) => (
								<ListItem key={index}>
									<ListItemText>{index}</ListItemText>
								</ListItem>
							))}
						</List>

					</Grid>
					<Grid item xs={4}>
						<FriendItem>My Friends</FriendItem>
						<List
							sx={{
								width: '100%',
								// maxWidth: 360,
								bgcolor: 'background.paper',
								position: 'relative',
								overflow: 'auto',
								maxHeight: 800,
								'& ul': { padding: 0 },
							}}
						>
							{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((index) => (
								<ListItem key={index}>
									<ListItemText>{index}</ListItemText>
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>
			</Box>
		</div>
		
	)
}