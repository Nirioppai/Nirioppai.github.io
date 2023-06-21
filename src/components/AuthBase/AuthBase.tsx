import { FC, PropsWithChildren } from 'react';

import { Box, Grid, Typography, alpha } from '@mui/material';

import bg from '~/assets/auth-bg.jpg';
import logo from '~/assets/logo.png';
import { APP_NAME } from '~/constants';

const AuthBase: FC<PropsWithChildren<unknown>> = ({ children }) => (
  <>
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
      }}
    >
      <Grid
        item
        xs={12}
        lg={6}
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.background.default, 0.9),
          backdropFilter: 'blur(9px)',
          maxWidth: {
            lg: 500,
          },
          mr: 'auto',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: {
              xs: 3,
              lg: 6,
            },
            minHeight: '100vh',
          }}
        >
          <Box sx={{ mt: 'auto' }}>
            <Box
              component='img'
              src={logo}
              sx={{
                width: 100,
                height: 100,
                mb: 2,
                display: 'block',
                mx: 'auto',
                userSelect: 'none',
              }}
              draggable={false}
            />
            <Typography
              variant='h2'
              component='div'
              gutterBottom
              sx={{ textAlign: 'center', mb: 2 }}
            >
              {APP_NAME}
            </Typography>
          </Box>
          <Box sx={{ mb: '58px' }}>{children}</Box>
          <Box sx={{ mt: 'auto' }} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{
          height: '100vh',
          display: {
            xs: 'none',
            lg: 'block',
          },
        }}
      />
    </Grid>
  </>
);

export default AuthBase;
