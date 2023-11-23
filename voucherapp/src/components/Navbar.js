import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserProfile from './UserProfile';
import Popover from '@mui/material/Popover';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openProfilePopup = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfilePopup = () => {
    setAnchorEl(null);
  };

  const isProfilePopupOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: 'black', height: '60px' }}>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div"  style={{ fontFamily: 'Arial', fontWeight: 'bold', color: '#fff', marginLeft: '20px' }}>
            Examinations Details
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
           
            <Button color="inherit" onClick={openProfilePopup}>
              <AccountCircleIcon style={{ color: 'skyblue', fontSize: '45px' }} />
            </Button>
            <Typography variant="inherit" style={{ marginRight: '20px', color: '#fff' }}>
              Profile
            </Typography>
            <Popover
              open={isProfilePopupOpen}
              anchorEl={anchorEl}
              onClose={closeProfilePopup}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <UserProfile />
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
