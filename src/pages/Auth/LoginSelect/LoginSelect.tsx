import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { AuthBase } from '~/components';
import { USER_TYPES } from '~/constants';

const LoginSelect = () => {
  return (
    <AuthBase>
      <Typography sx={{ textAlign: 'center', mb: 3 }}>
        Please select a user portal for sign in.
      </Typography>
      {USER_TYPES.map((userType) => (
        <Button
          key={userType.value}
          variant='contained'
          fullWidth
          sx={{
            marginBottom: 2,
          }}
          component={Link}
          to={`/login/${userType.value}`}
        >
          {userType.label}
        </Button>
      ))}
    </AuthBase>
  );
};

export default LoginSelect;
