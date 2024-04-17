import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, ListItem, ListItemAvatar, Rating, Typography, Box } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function ReviewListItem(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const item = props.item

	const spotifyId = item.spotifyId // id of the song/album the rating is for

	// info to display on each reviewListItem
	const [albumName, setAlbumName] = useState(null)
	const [trackName, setTrackName] = useState(null)
	const [picture, setPicture] = useState(null)
	const [artists, setArtists] = useState(null)
	
	const TRACK = `https://api.spotify.com/v1/tracks/${spotifyId}`
	const ALBUM = `https://api.spotify.com/v1/albums/${spotifyId}`

	// spotify call to get song info as soon as page loads (name, album, artist)
	useEffect(() => {
		
		// if track = 0, it is a song so use get track spotify call
		if(item.type == 0) {
			callApi('GET', TRACK, null, handleResponse)
		} else {
			// if track = 1, it is an album so use get album spotify call
			callApi('GET', ALBUM, null, handleResponse)
		}
		
	}, [])

	function handleResponse() {
		// is the response good?
		if ( this.status == 200 ) {
			var data = JSON.parse(this.responseText)
			//console.log(data)
			// assign values
			setAlbumName(data.album.name)
			setTrackName(data.name)
			setPicture(data.album.images[0].url)
			setArtists(data.artists.map(artist => artist.name).join(', '))
		} else { // other error occured
			console.log(this.responseText)
			alert(this.responseText)
		}
	}
	
	// calling API skeleton method
	function callApi(method, url, body, callback) {
		let xhr = new XMLHttpRequest()
		xhr.open(method, url, true)
		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
		xhr.send(body)
		xhr.onload = callback
	}

	return(
		<ListItem
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: 'fit-content',
				minHeight: '175px',
				borderRadius: '10px',
				minWidth: '800px',
			}}
		>
			<Grid container direction='column'>
				<Grid item xs={1} sx={{maxHeight: '130px'}}>
					<Grid container columns={12} >
						<Grid item xs={2}
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'center',
								minWidth: '128px'
							}}
						>
							<ListItemAvatar>
								<Avatar 
									src={picture}
									sx={{
										height: '128px',
										width: '128px',
										bgcolor: 'white',
										borderRadius: '0px'
									}}
								/>
							</ListItemAvatar>
						</Grid>

						<Grid item xs={8} sx={{paddingLeft: '10px', overflow: 'hidden', minWidth: '100px', width: '50%'}}>
							<Typography
								fontFamily={font}
								color={'white'}
								fontWeight={600}
								fontSize={'30px'}
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
							>
								{trackName}
							</Typography>

							<Typography
								fontFamily={font}
								color={'white'}
								fontWeight={600}
								fontSize={'20px'}
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
							>
								{artists}
							</Typography>

							<Typography
								fontFamily={font}
								color={'white'}
								fontWeight={300}
								fontSize={'20px'}
								style={{
									minWidth: '130px',
									wordWrap: 'break-word',
									whiteSpace: 'normal'
								}}
							>
								{albumName}
							</Typography>
						</Grid>

						<Grid item xs={2} sx={{display: 'flex', flexDirection: 'column', textalign: 'center', alignItems: 'center', justifyContent: 'center'}}>
							<Typography
								fontFamily={font}
								color={'white'}
								fontWeight={300}
								fontSize={'20px'}
								style={{
									minWidth: '130px',
									textAlign: 'right',
									wordWrap: 'break-word',
									whiteSpace: 'normal'
								}}
							>
								<Rating name="read-only" value={item.rating} precision={0.5} readOnly />

							</Typography>
							{/* button to edit the review here */}
							<Button variant="contained" sx={{float: 'right'}}>Edit</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={1}>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							wordWrap: 'break-word',
							whiteSpace: 'normal'
						}}
					>
						{item.description}
					</Typography>
				</Grid>
			</Grid>


			{/* picture */}
			
			{/* maybe put the grid here? */}
			{/* <Grid container columns={5} sx={{marginRight: '50px'}}>
				<Grid item xs={4}
					sx={{
						paddingLeft: '10px',
					}}
				>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={600}
						fontSize={'30px'}
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{trackName}
					</Typography>

					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={600}
						fontSize={'20px'}
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{artists}
					</Typography>

					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							wordWrap: 'break-word',
							whiteSpace: 'normal'
						}}
					>
						{albumName}
					</Typography>

					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							wordWrap: 'break-word',
							whiteSpace: 'normal'
						}}
					>
						{item.description}
					</Typography>
				</Grid>

				<Grid item xs={1} 
					sx={{
						alignItems: 'right',
					}}
				>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							textAlign: 'right',
							wordWrap: 'break-word',
							whiteSpace: 'normal'
						}}
					>
						<Rating name="read-only" value={item.rating} precision={0.5} readOnly />

					</Typography>
					{/* button to edit the review here
					<Button variant="contained" sx={{float: 'right'}}>Edit</Button>

				</Grid>
			</Grid> */}

		</ListItem>
	)
}