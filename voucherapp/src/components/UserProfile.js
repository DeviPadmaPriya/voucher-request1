import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    welcomeMessage: '',
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    
    navigate('/register');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Avatar
        alt="Profile"
        style={{ width: '100px', height: '100px', marginBottom: '10px', marginLeft: '50px' }}
      >
        {user.name.charAt(0)}
      </Avatar>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <Button variant="outlined" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserProfile;
