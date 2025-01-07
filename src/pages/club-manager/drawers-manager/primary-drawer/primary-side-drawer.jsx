import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { GridMenuIcon } from '@mui/x-data-grid';

export default function PrimarySideDrawer({ primaryDrawerList, mainFuncs }) {
  const clubNames = ['האקדמיה של דודי סלע']
  const [state, setState] = useState({
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  // TODO: uncomment following
  useEffect(()=> {
    mainFuncs[1]()
  }, []);

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : "28vw" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {clubNames.map((name, index) => (
          <ListItem key={index}>
            <Box className="flex align-center">
              <GridMenuIcon onClick={() => toggleDrawer(!state)} className='drawer-back-btn' />
            </Box>
            <ListItemText primary={name} className='drawer-club-name' />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {primaryDrawerList.map((item, index) => (
          <ListItem key={index} disablePadding onClick={() => mainFuncs[index]()}>
            <ListItemButton>
              <img src={item.icon} alt={item.title} className="drawer-icon" />
              <ListItemText primary={item.title} className='primary-drawer-list-title' />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box className="flex align-right justify-between">
        <GridMenuIcon id="toggle-primary-drawer" className="toggle-primary-drawer" onClick={toggleDrawer('right', true)} />
      </Box>
      <Drawer
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}