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
	const [name, setName] = useState(null)
	const [picture, setPicture] = useState(null)
	const [artists, setArtists] = useState(null)
	const [type, setType] = useState(null)
	
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
			if(item.type == 0) {
				// assign track values
				setName(data.name)
				setAlbumName(data.album.name)
				setPicture(data.album.images[0].url)
				setArtists(data.artists.map(artist => artist.name).join(', '))
			} else {
				// assign album values
				setName(data.name)
				setPicture(data.images[0].url)
				setArtists(data.artists.map(artist => artist.name).join(', '))
				setType(data.type.charAt(0).toUpperCase() + data.type.slice(1))
			}
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
				minWidth: '780px'
			}}
		>
			<Grid container direction='column' sx={{ height: 'fit-content'}}>
				<Grid item xs={1} sx={{maxHeight: '130px', maxwidth: '780px'}}>
					<Grid container columns={10} sx={{maxwidth: '780px'}} >
						<Grid item xs={2}
							sx={{
								display: 'flex',
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

						<Grid item xs={6} style={{display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: '100px', maxWidth: '450px'}}>
							<Typography
								fontFamily={font}
								color={'white'}
								fontWeight={600}
								fontSize={'30px'}
								style={{
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									marginBottom: '5px',
									maxwidth: '450px'
								}}
							>
								{name}
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
									marginBottom: '5px',
									maxwidth: '450px'
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
									whiteSpace: 'normal',
									marginBottom: '5px',
									maxwidth: '450px'
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
									whiteSpace: 'normal',
									marginBottom: '5px',
									maxwidth: '450px'
								}}
							>
								{type}
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
				<Grid item xs={1} sx={{maxwidth: '780px'}}>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							maxWidth: '750px',
							overflowWrap: 'break-word',
							whiteSpace: 'normal',
							marginTop: '5px'
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