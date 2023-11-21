// AccessDenied.js

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const AccessDenied = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Stack spacing={3} alignItems="center">
        <Typography variant="h4">Access Denied</Typography>
        <Typography>
          You do not have the necessary permissions to access this page.
        </Typography>
        <Link to="/event">
          <Button variant="contained">Go to Home</Button>
        </Link>
      </Stack>
    </div>
  );
};

export default AccessDenied;
