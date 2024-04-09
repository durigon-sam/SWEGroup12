import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, Typography, Item, Box, Paper, ListItem, ListItemButton, ListItemText, TextField, InputAdornment, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { styled } from '@mui/material/styles'
import SearchListItem from './SearchListItem'

export default function Search(){

	// use the spotify search API call found at https://developer.spotify.com/documentation/web-api/reference/search
    
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedFilter, setSelectedFilter] = useState('songs')
  
	const handleSearch = () => {
		// Perform search based on searchTerm and selectedFilter
		console.log(`Searching for ${searchTerm} in ${selectedFilter}`)
	}

	//triggers every time searchTerm is modified
	useEffect(() => {
		console.log(searchTerm)
	}, [searchTerm])

	return(
		<div className='App'>
			<SideBar className='sidebar'/>
			<div className='App-header' 
				style={{
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Grid container columns={10} 
					sx={{
						
						background: '#3D2159',
						textAlign: 'left',
						color: 'white',
						height: '100px',
						minWidth: '395px',
						borderRadius: '50px',
						margin: '20px',
						width: '90%',
						flexWrap: 'nowrap',
					}}
				>
					{/* search bar */}
					<Grid item xs={8} sx={{minWidth: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '20px', marginRight: '10px'}}>
						<TextField
							fullWidth
							variant='outlined'
							placeholder="Search"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<SearchIcon/>
									</InputAdornment>
								),
								sx: {
									color: 'white', // Set the text color to white
								},
							}}
							sx={{
								color: 'white',
								bgcolor: '#444444',
								borderRadius: '10px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// TODO: FIGURE OUT WHY THE BLUE OUTLINE WON'T GO AWAY
								'&:focus .MuiOutlinedInput-notchedOutline': {
									borderColor: 'white',
								},
							}}
						/>
					</Grid>
					{/* filter dropdown */}
					<Grid item xs={1} sx={{minWidth: '92px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px'}}>
						<TextField
							fullWidth
							select
							className="filter-dropdown"
							variant="outlined"
							value={selectedFilter}
							onChange={(e) => setSelectedFilter(e.target.value)}
							
							// TODO: figure out how to style this bc i can't find something i like
							sx={{
								color: 'white',
								bgcolor: 'white',
								borderRadius: '5px',
								'& .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								'&:hover .MuiOutlinedInput-notchedOutline': {
									borderColor: 'transparent',
								},
								// TODO: FIGURE OUT WHY THE BLUE OUTLINE WON'T GO AWAY
								'&:focus .MuiOutlinedInput-notchedOutline': {
									borderColor: 'white',
								},
							}}
						>
							<MenuItem value="songs">Songs</MenuItem>
							<MenuItem value="albums">Albums</MenuItem>
							<MenuItem value="users">Users</MenuItem>
						</TextField>
					</Grid>
					
					{/* search button */}
					<Grid item xs={1} sx={{minWidth: '88px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '20px'}}>
						<Button
							fullWidth
							variant="contained"
							style={{ backgroundColor: '#2D46B9'}} // Set the custom background and text colors
							onClick={handleSearch}
						>
                            Search
						</Button>
					</Grid>
				</Grid>

				{/* SearchResults */}
				<List
					sx={{
						posiiton: 'relative',
						overflow: 'auto',
						maxHeight: '80vh',
						width: '85%',
						'& ul': {padding: 0},
					}}
				>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<SearchListItem key={item} item={item}/>
					))}
				</List>
				
			</div>
		</div>
	)
}
