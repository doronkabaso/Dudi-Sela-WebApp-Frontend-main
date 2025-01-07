import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function SecondarySideDrawer({ secondaryDrawerList, openClubComponent, showSecondaryDrawer, setShowSecondaryDrawer }) {
  const clubNames = ['האקדמיה של דודי סלע']
  const openMainDrawer = () => {
    const clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
    const el = document.getElementById("toggle-primary-drawer")
    el.dispatchEvent(clickEvent);
  }
  const list = () => (
    <Box
      sx={{ width: '30vw' }}
      role="presentation"
    >
      <List>
        {clubNames.map((name, index) => (
          <ListItem key={index}>
            <Box className="flex align-center">
              <button onClick={() => openMainDrawer()} className='drawer-back-btn'>
                <img src="https://res.cloudinary.com/primap/image/upload/v1681249188/arrow-back_ax3ffu.svg" alt='back' />
              </button>
              {/* <GridMenuIcon onClick={() => openMainDrawer()} /> */}
            </Box>
            <ListItemText primary={name} className='drawer-club-name' />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryDrawerList.map((item, index) => (
          <ListItem key={index} disablePadding onClick={(e) => openClubComponent(e, item.title)}>
            <ListItemButton>
              <ListItemIcon>
                <img alt={item.title} src={item.icon} className="drawer-icon" />
              </ListItemIcon>
              <ListItemText primary={item.title} className='secondary-drawer-list-title' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor='right'
        open={showSecondaryDrawer}
        onClose={() => setShowSecondaryDrawer(false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}