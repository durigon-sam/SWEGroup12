import React from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { styled } from '@mui/material/styles'
import SongListItem from './SongListItem'
import recentData from '../dummydata/recents.json'
import friends from '../dummydata/friends.json'
import FriendListItem from './FriendListItem'

export default function HomePage(){

	const font = './LibreFranklin-VariableFont_wght.ttf'

	const RecentItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to right, #2D46B9, #1ED760)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	const FriendItem = styled(Paper)(({ theme }) => ({
		background: 'linear-gradient(to left, #2D46B9, #3D2159)',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'left',
		color: 'white',
		height: '75px',
		marginBottom: '20px',
	}))

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<Box className='App-header' sx={{}}>
				<Grid container spacing={2} columns={16} sx={{margin: '20px 30px 20px 30px'}}>
					<Grid item xs={10} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<RecentItem>
							<Typography variant='h3' fontFamily={font} fontWeight={600}>My Recent Listening</Typography>
              // <Typography color='white'>Current clientId is: {localStorage.getItem('client_id')}</Typography>
						</RecentItem>
						<List
							sx={{
								position: 'relative',
								overflow: 'auto',
								maxHeight: '80vh',
								'& ul': { padding: 0 },
							}}
						>
							{/* This gets replaced with the actual user data */}
							{recentData.recents.map((item) => (
								<SongListItem key={item.id} item={item}/>
							))}
						</List>

					</Grid>
					<Grid item xs={1} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}/>
					<Grid item xs={5} sx={{'&.MuiGrid-item':{padding: '0px 0px 0px 0px'}}}>
						<FriendItem>
							<Typography variant='h3' fontFamily={font} fontWeight={700}>My Friends</Typography>
						</FriendItem>
						<List
							sx={{
								width: '100%',
								position: 'relative',
								overflow: 'auto',
								maxHeight: '80vh',
								'& ul': { padding: 0 },
							}}
						>
							{friends.friends.map((item) => (
								<FriendListItem key={item.userid} item={item}/>
							))}
						</List>
					</Grid>
				</Grid>
			</Box>
		</div>
		
	)
}