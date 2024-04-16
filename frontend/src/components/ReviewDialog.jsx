import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Avatar, Rating, TextField, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ReviewDataService from '../services/reviewService'

export default function ReviewDialog(props) {

	const font = './LibreFranklin-VariableFont_wght.ttf'
	const [open, setOpen] = React.useState(false)
	const [ratingValue, setRatingValue] = React.useState(null)
	const [reviewField, setReviewField] = React.useState(null)
	const item = props.item
	const reviewService = new ReviewDataService()

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleSave = () => {
		if(ratingValue === null){
			alert('Please add a star rating.')
		}else{
			//call createRating
			var newReview = {
				'spotifyId': item.id, 
				'type': item.type,
				'rating': ratingValue,
				'description': reviewField,
				'user': localStorage.getItem('userId')
			}

			// TODO: uncomment this when merged with max
			// reviewService.create(newReview)
			// 	.then(response => {
			// 		console.log(response.data)
			// 	})
			console.log(newReview)
			setRatingValue(null)
			handleClose()
		}
	}

	const handleRatingChange = (e) => {
		setRatingValue(parseFloat(e.target.value))
	}

	const handleReviewFieldChange = (e) => {
		setReviewField(e.target.value)
	}

	return (
		<React.Fragment>
			<Button 
				variant="outlined" 
				className='reviewButton'
				sx={{
					width: '80%',
					minWidth: '100px',
					backgroundColor: '#3D2159',
					borderRadius: '45px',
					marginLeft: 'auto', // Align the button to the right
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					'&:hover': {
						backgroundColor: '#1ED760',
					}
				}}
				onClick={handleClickOpen}>
				<Typography fontWeight={300} color={'white'}>
                    Review
				</Typography>
			</Button>
			<Dialog
				fullWidth
				maxWidth={'md'}
				open={open}
				disableEscapeKeyDown
				sx={{
					'.MuiDialog-paper': {
						bgcolor: 'rgb(18, 18, 18)',
						backgroundImage: 'linear-gradient(#001321, #001321)'
					},
				}} 
			>
				<DialogTitle color={'white'}>New Review</DialogTitle>
				<DialogContent>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							m: 'auto',
							width: 'fit-content'
						}}
					>
						{/* Content goes here */}
						<Avatar 
							sx={{
								width: '128px',
								height: '128px',
								borderRadius: '0',
							}}
							src={item.album.images[1].url}
						/>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginLeft: '10px',
								width: 'fit-content',
							}}
						>
							<Typography 
								fontFamily={font} 
								color={'white'} 
								fontWeight={300} 
								fontSize={'20px'}
								style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
							>
								{item.name}
							</Typography>
							<Typography 
								fontFamily={font} 
								color={'white'} 
								fontWeight={300} 
								fontSize={'20px'}
								style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
							>
								{item.artists.map(artist => artist.name).join(', ')}
							</Typography>
							{/* TODO align this to the bottom of the card */}
							<Typography 
								fontFamily={font} 
								color={'white'} 
								fontWeight={300}
								fontSize={'20px'}
								style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', height: '33%' }}
							>
								{item.album.name}
							</Typography>
						</Box>
					</Box>
					<Box
						noValidate
						component="form"
						sx={{
							display: 'flex',
							flexDirection: 'column',
							m: 'auto',
							marginTop: '20px',
							width: 'fit-content',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Rating 
							value={ratingValue} 
							name='Music Rating' 
							precision={0.5} 
							size='large'
							onChange={(e) => handleRatingChange(e)}
							emptyIcon={<StarIcon style={{ opacity: 1, color: 'white' }} fontSize="inherit" />}
						/>

						<TextField
							fullWidth
							label={'Write a review (Optional)'}
							variant='filled'
							margin='normal'
							multiline
							sx={{
								backgroundColor: 'white',
								color: 'white',
								width: '40vw'
							}}
							onChange={(e) => handleReviewFieldChange(e)}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button type='submit' variant='contained' color='success' onClick={handleSave} sx={{m: '5px'}}>Save</Button>
					<Button variant='contained' color='error' onClick={handleClose} sx={{m: '5px'}}>Close</Button>	
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}
