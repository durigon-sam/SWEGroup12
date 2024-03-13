import React from 'react'
import { Box, AppBar, Button, Divider, Drawer, List, ListItem, ListItemText} from '@mui/material'

export default function SideBar(){
	const [open, setOpen] = React.useState(true)


	return(
		<div>
			<Drawer variant='persistent' anchor='left' open='true'>
				<List>
					{['Item1', 'Item2', 'Item3'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemText primary={text}/>
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	)
}