import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'
import '../styles/home.css'
import '../styles/App.css'
import { Grid, List, TextField, InputAdornment, MenuItem, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import SongListItem from './SongListItem'
import SearchAlbumListItem from './SearchAlbumListItem'
import UserDataService from '../services/userService'
import FriendListItem from './FriendListItem'

const SEARCH = 'https://api.spotify.com/v1/search'

export default function Search(){

	// use the spotify search API call found at https://developer.spotify.com/documentation/web-api/reference/search
    
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedFilter, setSelectedFilter] = useState('songs')
	const [searchResults, setSearchResults] = useState([])
	const [friendResults, setFriendResults] = useState([])
	const userService = new UserDataService()

	function isEmailFormat(searchTerm) {
		var regexPattern = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
		return regexPattern.test(searchTerm)
	}
  
	const handleSearch = () => {
		if(searchTerm === ''){
			alert('Please input a search term')
		}else{
			if(selectedFilter === 'users'){
				console.log(`searching for users ${searchTerm}`)
				if(isEmailFormat(searchTerm)){
					// search for email
					userService.getUserByEmail(searchTerm)
						.then(response => {
							setFriendResults(response.data)
						})
						.catch(error => {
							alert(`No User Found with email ${searchTerm}`)
						})
				}else{
					// search for username
					userService.getUserByEmail(searchTerm)
						.then(response => {
							setFriendResults(response.data)
						})
						.catch(error => {
							alert(`No User Found with username ${searchTerm}`)
						})
				}

			}else{
				// Perform search based on searchTerm and selectedFilter
				console.log(`Searching for ${searchTerm} in ${selectedFilter}`)
				let url = `${SEARCH}?q=${searchTerm}&type=`
				selectedFilter === 'songs' ? url += 'track' : url += 'album'
				console.log(url)
				callApi('GET', url, null, handleResponse)
			}
		}
	}

	// useEffect(() => {
	// 	console.log(Object.keys(searchResults)[0])
	// }, [])

	// useEffect(() => {
	// 	console.log(Object.keys(searchResults)[0])
	// }, [searchResults])

	//triggers every time searchTerm is modified
	// useEffect(() => {
	// 	console.log(searchTerm)
	// }, [searchTerm])

	// useEffect(() => {
	// 	console.log(selectedFilter)
	// }, [selectedFilter])

	// calling API skeleton method
	function callApi(method, url, body, callback){
		let xhr = new XMLHttpRequest()
		xhr.open(method, url, true)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
		xhr.send(body)
		xhr.onload = callback
	}

	function handleResponse() {
		// is the response good?
		if ( this.status == 200 ){
			var data = JSON.parse(this.responseText)
			// set the returned songs to the state variable
			setSearchResults(data)
			console.log(data)
		} else { // other error occured
			console.log(this.responseText)
			alert(this.responseText)
		}
	}

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
						minWidth: '175px',
						width: '85%',
						'& ul': {padding: 0},
					}}
				>
					{
						Object.keys(searchResults)[0] === undefined ? 
							// user Search logic
							friendResults.map((item) => (
								<FriendListItem key={item.userId} item={item}/>
							))
							:
							Object.keys(searchResults)[0] === 'tracks' ?
								searchResults.tracks.items.map((item) => (
									<SongListItem key={item.id} item={item} search={true}/>
								))
								: 
								searchResults.albums.items.map((item) => (
									<SearchAlbumListItem key={item.id} item={item}/>
								))
					}
				</List>
				
			</div>
		</div>
	)
}
