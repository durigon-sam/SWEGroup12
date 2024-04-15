import React from 'react'
import { Avatar, Grid, ListItem, ListItemAvatar, Typography } from '@mui/material'
import '../styles/home.css'
import '../styles/App.css'

export default function ReviewListItem(props) {

	// TODO: fix styling on these cards

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const {name, artist, rating, review} = props.item

	return(
		<ListItem
			sx={{
				background: 'linear-gradient(to left, #2D46B9, #1ED760)',
				marginBottom: 5,
				height: '125px',
				borderRadius: '10px',
			}}
		>
			{/* picture */}
			<ListItemAvatar>
				<Avatar 
					alt={name} 
					src='/BeatBlendr_Logos/Icon_Color.png'
					sx={{
						height: '128px',
						width: '128px',
						bgcolor: 'white',
						borderRadius: '0px'
					}}
				/>
			</ListItemAvatar>
			{/* maybe put the grid here? */}
			<Grid container columns={3} sx={{marginRight: '50px'}}>
				<Grid item xs={2}
					sx={{
						paddingLeft: '10px'
					}}
				>
					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={400}
						fontSize={'30px'}
						style={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{name}
					</Typography>

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
						{artist}
					</Typography>

					<Typography
						fontFamily={font}
						color={'white'}
						fontWeight={300}
						fontSize={'20px'}
						style={{
							minWidth: '130px',
							// textAlign: 'right',
							wordWrap: 'break-word',
							whiteSpace: 'normal'
						}}
					>
						{review}
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
						Rating: {rating} stars
					</Typography>
				</Grid>
			</Grid>

		</ListItem>
	)
}